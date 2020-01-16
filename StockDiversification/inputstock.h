#ifndef INPUTSTOCK_H
#define INPUTSTOCK_H

#include <QTextEdit>
#include <QDockWidget>

class inputStock : public QDockWidget
{
    Q_OBJECT
public:
    inputStock(QWidget *parent, QRect *rect);
    ~inputStock();
private:
    QTextEdit* ticker;
    QTextEdit* quantity;
};

#endif // INPUTSTOCK_H
