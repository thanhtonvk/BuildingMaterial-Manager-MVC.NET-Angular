using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Model;

namespace BaiTapLonMVC.Areas.Admin.Controllers
{
    public class ProductController : Controller
    {
        // GET
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Update()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Details()
        {
            return View();
        }

        private DBContext db = new DBContext();

        public JsonResult GetAllProduct(string searchString)
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Product> categorieList = db.Products.Where(x => x.IsDeleted == false).ToList();
            if (string.IsNullOrEmpty(searchString))
            {
                return Json(categorieList, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var model = categorieList.Where(x =>
                    x.Name.ToLower().Contains(searchString.ToLower()) ||
                    x.MetaName.ToLower().Contains(searchString.ToLower()) ||
                    x.Description.ToLower().Contains(searchString.ToLower()) ||
                    x.Image.ToLower().Contains(searchString.ToLower())).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetProduct(int? id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Product Product = db.Products.Find(id);
            return Json(Product, JsonRequestBehavior.AllowGet);
        }

        public string InsertProduct(Product product)
        {
            if (product != null)
            {
                product.IsDeleted = false;
                db.Products.Add(product);
                db.SaveChanges();
                return "Thêm thành công";
            }
            else
            {
                return "Thêm không thành công";
            }
        }

        public string UpdateProduct(Product Product)
        {
            if (Product != null)
            {
                var _category = db.Entry(Product);
                Product cateObj = db.Products.Where(x => x.ID == Product.ID).FirstOrDefault();
                cateObj.Name = Product.Name;
                cateObj.Image = Product.Image;
                cateObj.MetaName = Product.MetaName;
                cateObj.Cost = Product.Cost;
                cateObj.Description = Product.Description;
                cateObj.Details = Product.Details;
                cateObj.HotDeal = Product.HotDeal;
                cateObj.IsTopSeller = Product.IsTopSeller;
                cateObj.IsOnTop = Product.IsOnTop;
                cateObj.IsNew = Product.IsNew;
                cateObj.IsStatus = Product.IsStatus;
                cateObj.IsDeleted = false;
                cateObj.Category = Product.Category;
                cateObj.Brand = Product.Brand;
                db.SaveChanges();
                return "Update thành công";
            }
            else
            {
                return "Update không thành công";
            }
        }

        public string DeleteProduct(int? id)
        {
            if (id != null)
            {
                Product product = db.Products.Find(id);
                var _product = db.Entry(product);
                Product cateObj = db.Products.Where(x => x.ID == product.ID).FirstOrDefault();
                cateObj.IsDeleted = true;
                db.SaveChanges();
                return "Xóa thành công";
            }
            else
            {
                return "Xóa không thành công";
            }
        }

        public JsonResult GetAllBranch()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Brand> categorieList = db.Brands.Where(x => x.IsDeleted == false).ToList();
            return Json(categorieList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllCategory()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Category> categorieList = db.Categories.Where(x => x.IsDeleted == false).ToList();
            return Json(categorieList, JsonRequestBehavior.AllowGet);
        }
    }
}