const express = require('express');
const Film = require('../models/Film.js');
const router = express.Router();

/* POST URL Path /films/ */
router.post('/', async function(req, res, next) {
  film = await req.body;
  // If not matching proper request, send a 404
  if(film.title === undefined || film.body === undefined){
    res.status(400).send();
  }
  needs_creating = true;
  if(!res.headersSent){
    count = 0;
    counting = true;
    while(counting){
      await Film.find({filmID: count}, function(err, docs){
        if(err){
          console.log(err);
          res.status(500).send();
        }
        else if(docs.length !== 0){
          count+=1
        }
        else{
          counting = false;
        }
      })
    }
    if(needs_creating){
      await Film.create({
        filmID: count,
        title: film.title,
        body: film.body,
        date: Date(Date.now()).toString(),
        reviews: []
      },
      function(err, instance){
        if(err){
          console.log(err);
          res.status(500).send();
        }
      }
      );
    }
    res.status(201).send();
  }
});

/* GET URL Path /films/ */
/* also allows path /films?search=query */
router.get('/', async function(req, res, next) {
  films = [];
  await Film.find({}, function(err, docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      films = [];
      if(!res.headersSent){
        if(req.query.search !== undefined){
          for(i in docs){
            if(docs[i].title.includes(req.query.search) || docs[i].body.includes(req.query.search)){
              films.push(docs[i]);
            }
          }
        }
        else{
          films = docs;
        }
        res.status(201).send(JSON.stringify(films));
      }
    }
  })
  if(!res.headersSent){
    res.status(201).send();
  }
});

/* GET URL Path /films/[filmID] */
router.get('/:filmID', async function(req, res, next) {
  await Film.find({filmID: req.params["filmID"]}, function(err, docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      films = docs;
      if(films.length === 0){
        res.status(404).send();
      }
      if(!res.headersSent){
        res.status(201).send(JSON.stringify(films));
      }
    }
  })
});

/* PUT URL Path /films/[filmID] */
router.put('/:filmID', async function(req, res, next) {
  film = await req.body;
  if(film.title === undefined || film.body === undefined){
    res.status(400).send();
  }
  if(!res.headersSent){
    await Film.find({filmID: req.params["filmID"]}, async function(err, docs){
      if(err){
        console.log(err);
        res.status(500).send();
      }
      else{
        films = docs;
        if(films.length === 0){
          if(film.date === undefined){
            date = Date(Date.now()).toString();
          }
          else{
            date = film.date;
          }
          await Film.create({
            filmID: req.params["filmID"],
            title: film.title,
            body: film.body,
            date: date,
            reviews: []
          },
          function(err, instance){
            if(err){
              console.log(err);
              res.status(500).send();
            }
          }
          );
          res.status(201).send();
        }
        else{
          s_film = docs[0];
          if(film.date === undefined){
            date = Date(Date.now()).toString();
          }
          else{
            date = film.date;
          }
          s_film.title = film.title;
          s_film.body = film.body;
          s_film.date = date;
          s_film.save();
          res.status(201).send();
        }
      }
    })
  }
  if(!res.headersSent){
    res.status(500).send();
  }
});

/* DELETE URL Path /films/[filmID] */
router.delete('/:filmID', async function(req, res, next) {
  if(!res.headersSent){
    await Film.find({filmID: req.params["filmID"]}, async function(err, docs){
      if(err){
        console.log(err);
        res.status(500).send();
      }
      else{
        films = docs;
        if(films.length === 0){
          res.status(404).send();
        }
        else{
          await Film.deleteOne({filmID: req.params["filmID"]});
          res.status(201).send();
        }
      }
    })
  }
});

/* POST URL Path /films/[filmID]/reviews */
router.post('/:filmID/reviews', async function(req, res, next) {
  review = await req.body
  await Film.find({filmID: req.params["filmID"]}, function(err, docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      films = docs;
      if(review.title === undefined || review.body === undefined){
        res.status(400).send();
      }
      if(films.length === 0){
        res.status(404).send();
      }
      else{
        film = docs[0];
        ids = [];
        for(r in film.reviews){
          console.log(film.reviews[r].reviewID)
          ids.push(film.reviews[r].reviewID);
        }
        rev_id = 0;
        for(let i = 0; i < films.length; i++){
          if(!ids.includes(i)){
            rev_id = i;
            break;
          }
          rev_id+=1
        }
        film.reviews.push({
          reviewID: rev_id,
          title: review.title,
          body: review.body,
          date: Date(Date.now()).toString()
        })
        film.save();
        res.status(201).send();
      }
    }
  })
});

/* GET URL Path /films/[filmID]/reviews */
/* also allows path /films/[filmID]/reviews?search=query */
router.get('/:filmID/reviews', async function(req, res, next) {
  await Film.find({filmID: req.params["filmID"]}, function(err, docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      films = docs;
      if(films.length === 0){
        res.status(404).send();
      }
      if(!res.headersSent){
        film = docs[0];
        reviews = [];
        if(req.query.search !== undefined){
          for(i in film.reviews){
            if(film.reviews[i].title.includes(req.query.search) || film.reviews[i].body.includes(req.query.search)){
              reviews.push(film.reviews[i]);
            }
          }
        }
        else{
          reviews = film.reviews;
        }
        res.status(201).send(JSON.stringify(reviews));
      }
    }
  })
});

/* GET URL Path /films/[filmID]/reviews/[reviewID] */
router.get('/:filmID/reviews/:revID', async function(req, res, next) {
  await Film.find({filmID: req.params["filmID"]}, function(err, docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      films = docs;
      if(films.length === 0){
        res.status(404).send();
      }
      if(!res.headersSent){
        film = docs[0];
        var rev;
        for(i in film.reviews){
          if(film.reviews[i].reviewID == req.params["revID"]){
            rev = film.reviews[i];
          }
        }
        res.status(201).send(JSON.stringify(rev));
      }
    }
  })
});

/* PUT URL Path /films/[filmID]/reviews[reviewID] */
router.put('/:filmID/reviews/:revID', async function(req, res, next) {
  review = await req.body;
  if(review.title === undefined || review.body === undefined){
    res.status(400).send();
  }
  if(!res.headersSent){
    await Film.find({filmID: req.params["filmID"]}, async function (err, docs){
      if(docs.length === 0){
        res.status(404).send();
      }
      else{
        found = false;
        if(review.date === undefined){
          date = Date(Date.now()).toString();
        }
        else{
          date = review.date;
        }
        for(i in docs[0].reviews){
          if(req.params["revID"] == docs[0].reviews[i].reviewID){
            docs[0].reviews[i].title = review.title;
            docs[0].reviews[i].body = review.body;
            docs[0].reviews[i].date = date;
            found = true;
          }
        }
        if(!found){
          docs[0].reviews.push({
            reviewID: req.params["revID"],
            title: review.title,
            body: review.body,
            date: date
          })
        }
        docs[0].save();
        res.status(201).send();
      }
    })
  }
  if(!res.headersSent){
    res.status(500).send();
  }
});

/* DELETE URL Path /films/[filmID]/reviews/[reviewID] */
router.delete('/:filmID/reviews/:revID', async function(req, res, next) {
  await Film.find({filmID: req.params["filmID"]}, function(err, docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      films = docs;
      if(films.length === 0){
        res.status(404).send();
      }
      if(!res.headersSent){
        found = false;
        for(i in docs[0].reviews){
          if(req.params["revID"] == docs[0].reviews[i].reviewID){
            docs[0].reviews.splice(i, 1);
            found = true;
          }
        }
        if(!found){
          res.status(404).send();
        }
        docs[0].save();
        if(!res.headersSent){
          res.status(201).send();
        }
      }
    }
  })
});

module.exports = router;
