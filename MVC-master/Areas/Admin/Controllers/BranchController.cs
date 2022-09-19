using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Model;

namespace BaiTapLonMVC.Areas.Admin.Controllers
{
    public class BranchController : Controller
    {
        DBContext db = new DBContext();
        // GET: Admin/Brand


        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllBranch(string searchString)
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Brand> categorieList = db.Brands.Where(x => x.IsDeleted == false).ToList();
            if (string.IsNullOrEmpty(searchString))
            {
                return Json(categorieList, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var model = categorieList.Where(x => x.Name.ToLower().Contains(searchString.ToLower())).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public string InsertBranch(Brand brand)
        {
            if (brand != null)
            {
                brand.IsDeleted = false;
                db.Brands.Add(brand);
                db.SaveChanges();
                return "Thêm thành công";
            }
            else
            {
                return "Thêm không thành công";
            }
        }

        public string UpdateBranch(Brand brand)
        {
            if (brand != null)
            {
                var _brand = db.Entry(brand);
                Brand cateObj = db.Brands.Where(x => x.ID == brand.ID).FirstOrDefault();
                cateObj.Name = brand.Name;
                cateObj.MetaName = brand.MetaName;
                cateObj.IsDeleted = false;
                db.SaveChanges();
                return "Update thành công";
            }
            else
            {
                return "Update không thành công";
            }
        }

        public string DeleteBranch(Brand brand)
        {
            if (brand != null)
            {
                var _brand = db.Entry(brand);
                Brand cateObj = db.Brands.Where(x => x.Name == brand.Name).FirstOrDefault();
                cateObj.IsDeleted = true;
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