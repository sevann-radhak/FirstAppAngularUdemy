﻿using System;
using System.Collections.Generic;

namespace FirstAppAngularUdemy.Models
{
    public partial class PaginaTipoUsuario
    {
        public int Iidpaginatipousuario { get; set; }
        public int? Iidpagina { get; set; }
        public int? Iidtipousuario { get; set; }
        public int? Bhabilitado { get; set; }

        public Pagina IidpaginaNavigation { get; set; }
        public TipoUsuario IidtipousuarioNavigation { get; set; }
    }
}
