#include "mainwindow.h"
#include <QApplication>
#include <QDockWidget>
#include <QTextEdit>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;

//    QTextEdit* text = new QTextEdit(nullptr);


    w.show();

    return a.exec();
}
