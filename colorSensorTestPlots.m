clear; clc; format short e; close all;

%% plotting parameters
axesSize = 16;
tickSize = 12;
titleSize = 16;
markerSize = 4;
legSize = 16;
lw = .9;
dg = [0 0.7 0];

%% load calibration data from file and plot
[colorTemp, lux, R, G, B, c] = textread('colorData.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
n = 1:length(colorTemp); % samples
% formatSpec = '%f %f %f %f %f %f';
% A = fscanf(myFile,'%f %f %f %f %f %f'); % temp in K
figure
plot(lux,'m','Linewidth',lw);
hold on
plot(R,'r-','Linewidth',lw);
plot(G,'color',dg,'Linewidth',lw);
plot(B,'b-','Linewidth',lw);
plot(c,'c-','Linewidth',lw);
hold off
xlabel('Time')
ylabel('Channel Readings')



