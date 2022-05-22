using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartmentController(IConfiguration configuration)
        {
            configuration = _configuration;
        }

        [HttpGet] 
        public JsonResult Get()
        {
            string query = @"select DepartmentId,DepartmentName from Department";
            DataTable table = new DataTable();
            
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon =new  SqlConnection("Data Source=DESKTOP-1HJ5IIC\\SQLEXPRESS;Initial Catalog=EmployeeDB; Integrated Security=true"))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }
            }
            return new JsonResult(table);
        }
     
        [HttpPost]
        public JsonResult Post(Department dep)
        {
            string query = @"insert into Department values('"+dep.DepartmentName+@"')";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection("Data Source=DESKTOP-1HJ5IIC\\SQLEXPRESS;Initial Catalog=EmployeeDB; Integrated Security=true"))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }
            }
            return new JsonResult("Added successfully");
        }
        [HttpPut]
        public JsonResult Put(Department dep)
        {
            string query = @"update Department set DepartmentName ='" + dep.DepartmentName + @"' where DepartmentId = '"+dep.DepartmentId+@"'" ;
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection("Data Source=DESKTOP-1HJ5IIC\\SQLEXPRESS;Initial Catalog=EmployeeDB; Integrated Security=true"))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }
            }
            return new JsonResult("Updated successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from Department where DepartmentId = '" + id+ @"'";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection("Data Source=DESKTOP-1HJ5IIC\\SQLEXPRESS;Initial Catalog=EmployeeDB; Integrated Security=true"))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }
            }

            return new JsonResult("Delted Sucessfully");
        }
    }
}
