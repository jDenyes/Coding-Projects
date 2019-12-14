#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <sstream>

std::string ssystem(const char *command) {
    char tmpname [L_tmpnam];
    std::tmpnam (tmpname);
    std::string scommand = command;
    std::string cmd = scommand + " >> " + tmpname;
    std::system(cmd.c_str());
    std::ifstream file(tmpname, std::ios::in);
    std::string result;
    if(file) {
        while (!file.eof()) result.push_back(file.get());
        file.close();
    }
    remove(tmpname);
    return result;
}



int main() {
    std::string bash = "node C:\\Users\\Jacob\\Documents\\Coding\\Coding-Projects\\YahooStockApi\\test.js";
    std::string in;
    std::string s = ssystem(bash.c_str());
    std::istringstream iss(s);
    std::string output;
    while (std::getline(iss, output)) {
        std::cout << output;
    }
    return 0;
}