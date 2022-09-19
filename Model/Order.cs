namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Order")]
    public partial class Order
    {
        public int ID { get; set; }

        public int Product { get; set; }

        public int? Quantity { get; set; }

        public int CheckOut { get; set; }

        public virtual CheckOut CheckOut1 { get; set; }

        public virtual Product Product1 { get; set; }
    }
}
