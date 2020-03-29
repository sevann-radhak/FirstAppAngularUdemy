using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAppAngularUdemy.Classes
{
    public class PersonCLS
    {
        public int IdPerson { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime Birthday{ get; set; }

        public string Email { get; set; }

        public int BHabilitado { get; set; }

        // Additional props
        public string Name { get; set; }

        public string apPaterno { get; set; }

        public string apMaterno { get; set; }
    }
}
