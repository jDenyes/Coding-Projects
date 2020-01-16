#ifndef DIV_TOOLBAR_H
#define DIV_TOOLBAR_H

#include <QToolBar>
#include <QPushButton>
#include "inputstock.h"

class div_ToolBar : public QToolBar
{
    Q_OBJECT
public:
    div_ToolBar(const QString &title, QWidget *parent);
    ~div_ToolBar();
private:
    QPushButton * m_button;
    inputStock * inputText = nullptr;
private slots:
    void handleButton();
};

#endif // DIV_TOOLBAR_H
