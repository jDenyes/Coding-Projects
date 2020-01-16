#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    sidebar = new div_ToolBar("tickers", this);
    addToolBar(Qt::RightToolBarArea, sidebar);

//    connect(m_button, SIGNAL (released()),this, SLOT (handleButton()));
}

MainWindow::~MainWindow()
{
    delete ui;
}

//void MainWindow::handleButton() {
////    m_button->setText("Addded Stock");
////    firstInput = new inputStock(this, QPoint(100,100));
////    addDockWidget(Qt::LeftDockWidgetArea, firstInput);

//}
