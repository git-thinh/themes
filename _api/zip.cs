using Ionic.Zip;
using System; 
using System.Web.Mvc; 

namespace System.Web.Mvc.Api.Controllers
{
    [HandleError]
    public class zipController : Controller
    {
        [HttpPost]
        public void ZipFiles(FormCollection collection)
        {
            using (ZipFile zip = new ZipFile())
            {
                zip.AlternateEncodingUsage = ZipOption.AsNecessary;

                //var file_collection = _repository.GetListOfFiles();
                //foreach (var file in file_collection)
                //{
                //    // location , folder name
                //    zip.AddFile(file.FileLocation, file.Name);
                //}

                Response.Clear();
                Response.BufferOutput = false;
                //sets the zip folder name with date and time
                string zipName = String.Format("FolderName_{0}.zip", DateTime.Now.ToString("yyyy-MMM-dd-HHmmss"));
                Response.ContentType = "application/zip";
                Response.AddHeader("content-disposition", "attachment; filename=" + zipName);
                zip.Save(Response.OutputStream);
                Response.End();
            }
        }
    }
}
