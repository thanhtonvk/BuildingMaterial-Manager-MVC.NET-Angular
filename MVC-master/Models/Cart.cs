namespace BaiTapLonMVC.Models
{
    public class Cart
    {
        private int idProduct;
        private string nameProduct;
        private int quantity;
        private string image;
        private int cost;

        public Cart(int idProduct, string nameProduct, int quantity, string image, int cost)
        {
            this.idProduct = idProduct;
            this.nameProduct = nameProduct;
            this.quantity = quantity;
            this.image = image;
            this.cost = cost;
        }

        public Cart()
        {
            
        }

        public int IdProduct
        {
            get => idProduct;
            set => idProduct = value;
        }

        public string NameProduct
        {
            get => nameProduct;
            set => nameProduct = value;
        }

        public int Quantity
        {
            get => quantity;
            set => quantity = value;
        }

        public string Image
        {
            get => image;
            set => image = value;
        }

        public int Cost
        {
            get => cost;
            set => cost = value;
        }
    }
}