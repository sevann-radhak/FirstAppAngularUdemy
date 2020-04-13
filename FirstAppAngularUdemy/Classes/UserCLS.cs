using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAppAngularUdemy.Classes
{
    public class UserCLS
    {
        public int IdUser { get; set; }

        public string NameUser { get; set; }

        public string NamePerson { get; set; }

        public int BAvailable { get; set; }

        //public string UserType { get; set; }

        public PersonCLS Person { get; set; }

        public int iidPerson { get; set; }

        public UserTypeCLS UserType { get; set; }

        public string Password { get; set; }

        public string PasswordCheck { get; set; }
    }
}
