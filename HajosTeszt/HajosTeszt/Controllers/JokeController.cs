﻿using HajosTeszt.JokeModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    [Route("api/jokes")]
    [ApiController]
    public class JokeController : Controller
    {
        [HttpGet]
        public IEnumerable<Joke> Get()
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            return context.Jokes.ToList();
        }

        [HttpGet("{id}")]
        public Joke Get(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var keresettVicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            return keresettVicc;
        }

        [HttpPost]
        public void Post([FromBody] Joke újVicc)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            context.Jokes.Add(újVicc);
            context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var törlendőVicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            context.Remove(törlendőVicc);
        }

        // GET: JokeController
        public ActionResult Index()
        {
            return View();
        }

        // GET: JokeController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: JokeController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: JokeController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: JokeController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: JokeController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        
    }
}
