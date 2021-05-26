using HajosTeszt.OrdogModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    [Route("api/ordogok")]
    [ApiController]
    public class OrdogController : Controller
    {
        //Tudom, kicsit elrontottam a táblám elnevezését, de hát ez van... :/
        [HttpGet]
        public IEnumerable<OrdogTabla> Get()
        {
            OrdogContext context = new OrdogContext();
            return context.OrdogTablas.ToList();
        }

        [HttpGet("db")]
        public ActionResult M1() 
        {
            OrdogContext context = new OrdogContext();
            return new JsonResult(context.OrdogTablas.Count());
        }

        [HttpGet("{nev}")]
        public OrdogTabla Get(string nev)
        {
            OrdogContext context = new OrdogContext();
            var ordog = (from x in context.OrdogTablas
                                where x.Nev == nev
                         select x).FirstOrDefault();
            return ordog;
        }

        [HttpDelete("{nev}")]
        public void Delete(string nev)
        {
            OrdogContext context = new OrdogContext();
            var torlendoOrdog = (from x in context.OrdogTablas
                                where x.Nev == nev
                                select x).FirstOrDefault();
            context.Remove(torlendoOrdog);
            context.SaveChanges();
        }

        [HttpPost]
        public void Post([FromBody] OrdogTabla ujOrdog)
        {
            OrdogContext context = new OrdogContext();
            context.OrdogTablas.Add(ujOrdog);
            context.SaveChanges();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
