namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ImageProduct")]
    public partial class ImageProduct
    {
        public int ID { get; set; }

        [Column(TypeName = "ntext")]
        public string Image { get; set; }

        public int Product { get; set; }

        public virtual Product Product1 { get; set; }
    }
}
