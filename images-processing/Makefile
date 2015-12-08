SOURCE = main.cpp
TARGET = bin

all:
	g++ -ggdb $(SOURCE) `pkg-config --cflags opencv` -o $(TARGET) `pkg-config --libs opencv`
