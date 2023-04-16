using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using System.Linq;
using System;

namespace GAR.Controllers
{
    public class AddressesController : ControllerBase
    {
        private readonly ILogger<AddressesController> _logger;

        #region xml

        // General
        static private readonly string path = "C:\\Practice\\Web\\GAR\\";

        static private readonly XDocument xlevels = XDocument.Load(path + "AS_OBJECT_LEVELS_20230320_0c63ffea-e5ce-4b68-bd33-eca4ba0bb0e9.xml");
        static private readonly XElement? levels = xlevels.Element("OBJECTLEVELS");

        static private readonly XDocument xparam_types = XDocument.Load(path + "AS_PARAM_TYPES_20230320_9337ae8a-c01e-41c7-a8d5-2e9a29f92fe5.xml");
        static private readonly XElement? obj_params_types = xparam_types.Element("PARAMTYPES");

        // Region

        static private readonly string pathWithRegion = path + "87\\";

        static private readonly XDocument xobjects = XDocument.Load(pathWithRegion + "AS_ADDR_OBJ_20230320_80f600ee-382e-49df-a495-7110e8e0950d.xml");
        static private readonly XElement? objects = xobjects.Element("ADDRESSOBJECTS");

        static private readonly XDocument xparams = XDocument.Load(pathWithRegion + "AS_ADDR_OBJ_PARAMS_20230320_f1a5ba81-3292-4cec-8a60-20e89865601b.xml");
        static private readonly XElement? obj_params = xparams.Element("PARAMS");

        static private readonly XDocument xadm_hierarchy = XDocument.Load(pathWithRegion + "AS_ADM_HIERARCHY_20230320_f7bcb5da-0787-4d70-9c5d-e69b1011636e.xml");
        static private readonly XElement? adm_hierarchy = xadm_hierarchy.Element("ITEMS");

        static private readonly XDocument xmun_hierarchy = XDocument.Load(pathWithRegion + "AS_MUN_HIERARCHY_20230320_1741feec-eaee-41aa-8977-ed7937725753.xml");
        static private readonly XElement? mun_hierarchy = xmun_hierarchy.Element("ITEMS");

        #endregion

        public AddressesController(ILogger<AddressesController> logger)
        {
            _logger = logger;
        }

        protected internal static IEnumerable<GAR_elem> ElementsToJSON(IEnumerable<XElement>? objects)
        {
            List<GAR_elem> elems = new();

            if (objects is not null && objects.Any())
            {

                foreach (XElement obj in objects)
                {
                    XAttribute? ID = obj.Attribute("OBJECTID");
                    XAttribute? LEVEL = obj.Attribute("LEVEL");

                    var LEVEL_NAME = levels?
                        .Elements("OBJECTLEVEL")
                        .FirstOrDefault(p => p.Attribute("LEVEL")?.Value == LEVEL?.Value)
                        ?.Attribute("NAME");

                    elems.Add(new GAR_elem
                    {
                        ID = obj.Attribute("OBJECTID")?.Value,
                        Name = obj.Attribute("NAME")?.Value,
                        TypeName = obj.Attribute("TYPENAME")?.Value,
                        Code = getInfo(ID?.Value, "CODE"),
                        OKATO = getInfo(ID?.Value, "OKATO"),
                        OKTMO = getInfo(ID?.Value, "OKTMO"),
                        Level = $"{LEVEL?.Value}. {LEVEL_NAME?.Value}",
                    });
                }
            }
            return elems.ToArray();
        }
        protected internal static List<XElement>? GetChilds(string perentObjID, XElement hierarchy)
        {
            var childsID = hierarchy?
                .Elements("ITEM")
                .Where(p => p.Attribute("PARENTOBJID")?.Value == perentObjID
                    && p.Attribute("ISACTIVE")?.Value == "1");

            List<XElement> childs = new();

            if (childsID != null)
            {
                foreach (XElement item in childsID)
                {
                    //Console.WriteLine(item);

                    var newChilds = objects?
                        .Elements("OBJECT")
                        .Where(p =>
                            p.Attribute("OBJECTID")?.Value == item.Attribute("OBJECTID")?.Value
                            && p.Attribute("ISACTIVE")?.Value == "1"
                            && p.Attribute("ISACTUAL")?.Value == "1"
                        );

                    if (childs != null)
                    {
                        childs = childs.Concat(newChilds).ToList();
                    }
                }
            }
            return childs;
        }

        //Routes

        [HttpGet]
        public IEnumerable<GAR_elem> Regions()
        {
            IEnumerable<XElement>? region_objects = objects?
                .Elements("OBJECT")
                .Where(p => p.Attribute("LEVEL")?.Value == "1"
                    && p.Attribute("ISACTIVE")?.Value == "1"
                    && p.Attribute("ISACTUAL")?.Value == "1");

            return ElementsToJSON(region_objects);
        }

        public IEnumerable<GAR_elem> Mun(string id)
        {
            IEnumerable<XElement>? childs = GetChilds(id, mun_hierarchy);

            return ElementsToJSON(childs);
        }

        public IEnumerable<GAR_elem> Adm(string id)
        {
            IEnumerable<XElement>? childs = GetChilds(id, adm_hierarchy);

            return ElementsToJSON(childs);
        }

        public IEnumerable<Param_info> Info(string id)
        {
            var xobj_params = obj_params?
                .Elements("PARAM")
                .Where(p => p.Attribute("OBJECTID")?.Value == id
                    && p.Attribute("CHANGEIDEND")?.Value == "0");

            List<Param_info> obj_info = new();

            if (xobj_params != null)
            {
                foreach (XElement item in xobj_params)
                {
                    string? type_id = item.Attribute("TYPEID")?.Value;
                    obj_info.Add(new Param_info
                    {
                        ID = type_id,
                        Name = obj_params_types?
                            .Elements("PARAMTYPE")
                            .FirstOrDefault(p => p.Attribute("ID")?.Value == type_id)?
                            .Attribute("NAME")?
                            .Value,
                        Value = item.Attribute("VALUE")?.Value
                    });
                }
            }
            return obj_info;
        }

        static public string? getInfo(string? id, string type)
        {
            string? type_id = obj_params_types?.Elements("PARAMTYPE")
                            .FirstOrDefault(p => p.Attribute("CODE")?.Value == type)?
                            .Attribute("ID")?
                            .Value;

            var xobj_param = obj_params?
                .Elements("PARAM")
                .FirstOrDefault(p => p.Attribute("OBJECTID")?.Value == id
                    && p.Attribute("TYPEID")?.Value == type_id
                    && p.Attribute("CHANGEIDEND")?.Value == "0")?
                .Attribute("VALUE");
            return xobj_param?.Value;
        }
        //protected internal static List<GAR_elem> PrintElements(IEnumerable<XElement>? objects, List<GAR_elem> elems, XElement? hierarchy)
        //{
        //    if (objects is not null && objects.Any())
        //    {
        //        foreach (XElement obj in objects)
        //        {
        //            XAttribute? ID = obj.Attribute("OBJECTID");
        //            XAttribute? LEVEL = obj.Attribute("LEVEL");

        //            var LEVEL_NAME = levels?
        //                .Elements("OBJECTLEVEL")
        //                .FirstOrDefault(p => p.Attribute("LEVEL")?.Value == LEVEL?.Value)
        //                ?.Attribute("NAME");

        //            elems.Add(new GAR_elem
        //            {
        //                ID = obj.Attribute("OBJECTID")?.Value,
        //                Name = obj.Attribute("NAME")?.Value,
        //                TypeName = obj.Attribute("TYPENAME")?.Value,
        //                Level = LEVEL_NAME?.Value,
        //            });

        //            Console.WriteLine();

        //            PrintElements(GetChilds(ID?.Value, hierarchy), elems, hierarchy);
        //        }

        //    }

        //    return elems;
        //}

        //[HttpGet]
        //public IEnumerable<GAR_elem> Get()
        //{
        //    IEnumerable<XElement>? region = objects?
        //        .Elements("OBJECT")
        //        .Where(p => p.Attribute("LEVEL")?.Value == "1"
        //            && p.Attribute("ISACTIVE")?.Value == "1"
        //            && p.Attribute("ISACTUAL")?.Value == "1");


        //    List<GAR_elem> elems = new();

        //    return PrintElements(region, elems, mun_hierarchy).ToArray();
        //}
    }
}