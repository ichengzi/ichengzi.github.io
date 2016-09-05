    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            //XpsDocument document1= new XpsDocument(@"d:\test.xps", System.IO.FileAccess.Read);
            //documentViewer1.Document = document1.GetFixedDocumentSequence();
            //documentViewer1.Height = 300;
            //documentViewer1.Width = 300;

            FlowDocument doc = new FlowDocument();  
            Paragraph p = new Paragraph();  
            Run r = new Run();  
            r.FontFamily = new System.Windows.Media.FontFamily("Verdana");  
            r.FontSize = 16;  
            Color c = Color.FromArgb(255, 0, 0, 0);  
            r.Foreground = new SolidColorBrush(c);  
 
            r.Text = "Hello World!";
            doc.Blocks.Add(p);
            p.Inlines.Add(r);

            documentViewer1.Document = doc;
        }
    }