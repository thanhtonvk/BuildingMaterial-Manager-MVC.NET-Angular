using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Model;

namespace BaiTapLonMVC.Areas.Admin.Controllers
{
    public class NewsController : Controller
    {
        // GET
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Update()
        {
            return View();
        }

        private DBContext db = new DBContext();

        public JsonResult GetAllNews(string searchString)
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<News> categorieList = db.News.ToList();
            if (string.IsNullOrEmpty(searchString))
            {
                return Json(categorieList, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var model = categorieList.Where(x => x.Titile.ToLower().Contains(searchString.ToLower())).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetNews(int? id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            News news = db.News.Find(id);
            return Json(news, JsonRequestBehavior.AllowGet);
        }

        public string InsertNews(News news)
        {
            if (news != null)
            {
                db.News.Add(news);
                db.SaveChanges();
                return "Thêm thành công";
            }
            else
            {
                return "Thêm không thành công";
            }
        }
        public string UpdateNews(News news)
        {
            if (news != null)
            {
                var _category = db.Entry(news);
                News cateObj = db.News.Where(x => x.ID == news.ID).FirstOrDefault();
                cateObj.Titile = news.Titile;
                cateObj.Image = news.Image;
                cateObj.Content = news.Content;
                db.SaveChanges();
                return "Update thành công";
            }
            else
            {
                return "Update không thành công";
            }
        }

        public string DeleteNews(int? id)
        {
            if (id != null)
            {
                News news = db.News.Find(id);
                db.News.Remove(news);
                db.SaveChanges();
                return "Xóa thành công";
            }
            else
            {
                return "Xóa không thành công";
            }
        }
    }
}