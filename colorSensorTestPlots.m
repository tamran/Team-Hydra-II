clear; clc; format short e; close all;

%% plotting parameters
axesSize = 16;
tickSize = 12;
titleSize = 16;
markerSize = 4;
legSize = 16;
lw = 1.2;
dg = [0 0.5 0];

%% load data from file and plot
% myFile = fopen('fakeData.txt');
[colorTemp, lux, R, G, B, c] = textread('fakeData.txt','%f %f %f %f %f %f');
clf; figure (1)
plot(lux,'m','Linewidth',lw);
hold on
plot(R,'r-','Linewidth',lw);
plot(G,'color',[0 0.7 0],'Linewidth',lw);
plot(B,'b-','Linewidth',lw);
plot(c,'c','Linewidth',lw);

