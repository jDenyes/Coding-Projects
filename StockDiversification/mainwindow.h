#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QToolBar>
#include "div_toolbar.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
//private slots:
//    void handleButton();
private:
    div_ToolBar * sidebar;
private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
