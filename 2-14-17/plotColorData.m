clear; clc; format short e; close all;

%% plotting parameters
axesSize = 16;
tickSize = 12;
titleSize = 16;
markerSize = 4;
legSize = 16;
lw = 1;
dg = [0 0.7 0];
o = [1 .5 0];
%% load data
[cTempvec_control, Lvec_control, Rvec_control, Gvec_control, Bvec_control, Cvec_control] = textread('colorTest_control.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_control = length(Rvec_control)

[cTempvec_1ppm, Lvec_1ppm, Rvec_1ppm, Gvec_1ppm, Bvec_1ppm, Cvec_1ppm] = textread('colorTest_1ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_1ppm = length(Rvec_1ppm)

[cTempvec_10ppm, Lvec_10ppm, Rvec_10ppm, Gvec_10ppm, Bvec_10ppm, Cvec_10ppm] = textread('colorTest_10ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_10ppm = length(Rvec_10ppm)

[cTempvec_20ppm, Lvec_20ppm, Rvec_20ppm, Gvec_20ppm, Bvec_20ppm, Cvec_20ppm] = textread('colorTest_20ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_20ppm = length(Rvec_20ppm)

[cTempvec_30ppm, Lvec_30ppm, Rvec_30ppm, Gvec_30ppm, Bvec_30ppm, Cvec_30ppm] = textread('colorTest_30ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_30ppm = length(Rvec_30ppm)

[cTempvec_40ppm, Lvec_40ppm, Rvec_40ppm, Gvec_40ppm, Bvec_40ppm, Cvec_40ppm] = textread('colorTest_40ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_40ppm = length(Rvec_40ppm)

%% plot against time

figure(1)
plot(Rvec_1ppm,'LineWidth',lw)
hold all
plot(Rvec_10ppm,'LineWidth',lw)
plot(Rvec_20ppm,'LineWidth',lw)
plot(Rvec_30ppm,'LineWidth',lw)
plot(Rvec_40ppm,'LineWidth',lw)
plot(Rvec_control,'LineWidth',lw)
hold off
xlabel('Time (sample)','FontSize',axesSize)
ylabel('Red','FontSize',axesSize)
title('Red Channel Readings over Time','FontSize',titleSize)
legend('1ppm','10ppm','30ppm','40ppm','control')
print('redVsTime','-dpng')

figure
plot(Gvec_1ppm,'LineWidth',lw)
hold all
plot(Gvec_10ppm,'LineWidth',lw)
plot(Gvec_20ppm,'LineWidth',lw)
plot(Gvec_30ppm,'LineWidth',lw)
plot(Gvec_40ppm,'LineWidth',lw)
plot(Gvec_control,'LineWidth',lw)
hold off
xlabel('Time (sample)','FontSize',axesSize)
ylabel('Green','FontSize',axesSize)
title('Green Channel Readings over Time','FontSize',titleSize)
legend('1ppm','10ppm','20ppm','30ppm','40ppm','control')
print('greenVsTime','-dpng')

figure
plot(Bvec_1ppm,'LineWidth',lw)
hold all
plot(Bvec_10ppm,'LineWidth',lw)
plot(Bvec_20ppm,'LineWidth',lw)
plot(Bvec_30ppm,'LineWidth',lw)
plot(Bvec_40ppm,'LineWidth',lw)
plot(Bvec_control,'LineWidth',lw)
hold off
xlabel('Time (sample)','FontSize',axesSize)
ylabel('Blue','FontSize',axesSize)
title('Blue Channel Readings over Time','FontSize',titleSize)
legend('1ppm','10ppm','20ppm','30ppm','40ppm','control')
print('blueVsTime','-dpng')

figure
plot(Cvec_1ppm,'LineWidth',lw)
hold all
plot(Cvec_10ppm,'LineWidth',lw)
plot(Cvec_20ppm,'LineWidth',lw)
plot(Cvec_30ppm,'LineWidth',lw)
plot(Cvec_40ppm,'LineWidth',lw)
plot(Cvec_control,'LineWidth',lw)
hold off
xlabel('Time (sample)','FontSize',axesSize)
ylabel('Clear','FontSize',axesSize)
title('Clear Channel Readings over Time','FontSize',titleSize)
legend('1ppm','10ppm','20ppm','30ppm','40ppm','control')
print('clearVsTime','-dpng')


figure
plot(cTempvec_1ppm,'LineWidth',lw)
hold all
plot(cTempvec_10ppm,'LineWidth',lw)
plot(cTempvec_20ppm,'LineWidth',lw)
plot(cTempvec_30ppm,'LineWidth',lw)
plot(cTempvec_40ppm,'LineWidth',lw)
plot(cTempvec_control,'LineWidth',lw)
hold off
xlabel('Time (sample)','FontSize',axesSize)
ylabel('Color Temp','FontSize',axesSize)
title('Color Temperature Channel Readings over Time','FontSize',titleSize)
legend('1ppm','10ppm','20ppm','30ppm','40ppm','control')
print('cTempVsTime','-dpng')

figure
plot(Lvec_1ppm,'LineWidth',lw)
hold all
plot(Lvec_10ppm,'LineWidth',lw)
plot(Lvec_20ppm,'LineWidth',lw)
plot(Lvec_30ppm,'LineWidth',lw)
plot(Lvec_40ppm,'LineWidth',lw)
plot(Lvec_control,'LineWidth',lw)
hold off
xlabel('Time (sample)','FontSize',axesSize)
ylabel('Lux','FontSize',axesSize)
title('Lux Channel Readings over Time','FontSize',titleSize)
legend('1ppm','10ppm','20ppm','30ppm','40ppm','control')
print('luxVsTime','-dpng')

%% calculate average reading for each sample over 100 measurements

% sample 1ppm
R_1ppm = mean(Rvec_1ppm);
errorR_1ppm = std(Rvec_1ppm);

G_1ppm = mean(Gvec_1ppm);
errorG_1ppm = std(Cvec_1ppm);

B_1ppm = mean(Bvec_1ppm);
errorB_1ppm = std(Bvec_1ppm);

C_1ppm = mean(Cvec_1ppm);
errorC_1ppm = std(Cvec_1ppm);

L_1ppm = mean(Lvec_1ppm);
errorL_1ppm = std(Lvec_1ppm);

cTemp_1ppm = mean(cTempvec_1ppm);
errorcTemp_1ppm = std(cTempvec_1ppm);

% sample 10ppm
R_10ppm = mean(Rvec_10ppm);
errorR_10ppm = std(Rvec_10ppm);

G_10ppm = mean(Gvec_10ppm);
errorG_10ppm = std(Gvec_10ppm);

B_10ppm = mean(Bvec_10ppm);
errorB_10ppm = std(Bvec_10ppm);

C_10ppm = mean(Cvec_10ppm);
errorC_10ppm = std(Cvec_10ppm);

L_10ppm = mean(Lvec_10ppm);
errorL_10ppm = std(Lvec_10ppm);

cTemp_10ppm = mean(cTempvec_10ppm);
errorcTemp_10ppm = std(cTempvec_10ppm);

% sample 20ppm
R_20ppm = mean(Rvec_20ppm);
errorR_20ppm = std(Rvec_20ppm);

G_20ppm = mean(Gvec_20ppm);
errorG_20ppm = std(Gvec_20ppm);

B_20ppm = mean(Bvec_20ppm);
errorB_20ppm = std(Bvec_20ppm);

C_20ppm = mean(Cvec_20ppm);
errorC_20ppm = std(Cvec_20ppm);

L_20ppm = mean(Lvec_20ppm);
errorL_20ppm = std(Lvec_20ppm);

cTemp_20ppm = mean(cTempvec_20ppm);
errorcTemp_20ppm = std(cTempvec_20ppm);

% sample 30ppm
R_30ppm = mean(Rvec_30ppm);
errorR_30ppm = std(Rvec_30ppm);

G_30ppm = mean(Gvec_30ppm);
errorG_30ppm = std(Gvec_30ppm);

B_30ppm = mean(Bvec_30ppm);
errorB_30ppm = std(Bvec_30ppm);

C_30ppm = mean(Cvec_30ppm);
errorC_30ppm = std(Cvec_30ppm);

L_30ppm = mean(Lvec_30ppm);
errorL_30ppm = std(Lvec_30ppm);

cTemp_30ppm = mean(cTempvec_30ppm);
errorcTemp_30ppm = std(cTempvec_30ppm);

% sample 40ppm
R_40ppm = mean(Rvec_40ppm);
errorR_40ppm = std(Rvec_40ppm);

G_40ppm = mean(Gvec_40ppm);
errorG_40ppm = std(Gvec_40ppm);

B_40ppm = mean(Bvec_40ppm);
errorB_40ppm = std(Bvec_40ppm);

C_40ppm = mean(Cvec_40ppm);
errorC_40ppm = std(Cvec_40ppm);

L_40ppm = mean(Lvec_40ppm);
errorL_40ppm = std(Lvec_40ppm);

cTemp_40ppm = mean(cTempvec_40ppm);
errorcTemp_40ppm = std(cTempvec_40ppm);


% sample control
R_control = mean(Rvec_control);
errorR_control = std(Rvec_control);

G_control = mean(Gvec_control);
errorG_control = std(Gvec_control);

B_control = mean(Bvec_control);
errorB_control = std(Bvec_control);

C_control = mean(Cvec_control);
errorC_control = std(Cvec_control);

L_control = mean(Lvec_control);
errorL_control= std(Lvec_control);

cTemp_control = mean(cTempvec_control);
errorcTemp_control = std(cTempvec_control);

%% plot channels
conc = [0 1 10 20 30 40];
R = [R_control, R_1ppm, R_10ppm, R_20ppm, R_30ppm, R_40ppm];
errorR = [errorR_control, errorR_1ppm, errorR_10ppm, errorR_20ppm, errorR_30ppm, errorR_40ppm];
G = [G_control, G_1ppm, G_10ppm, G_20ppm, G_30ppm, G_40ppm];
errorG = [errorG_control, errorG_1ppm, errorG_10ppm, errorG_20ppm, errorG_30ppm, errorG_40ppm];
B = [B_control, B_1ppm, B_10ppm, B_20ppm, B_30ppm, B_40ppm];
errorB = [errorB_control, errorB_1ppm, errorB_10ppm, errorB_20ppm, errorB_30ppm, errorB_40ppm];
C = [C_control, C_1ppm, C_10ppm, C_20ppm, C_30ppm, C_40ppm];
errorC = [errorC_control, errorC_1ppm, errorC_10ppm, errorC_20ppm, errorC_30ppm, errorC_40ppm];
cTemp = [cTemp_control, cTemp_1ppm, cTemp_10ppm, cTemp_20ppm, cTemp_30ppm, cTemp_40ppm];
errorcTemp = [errorcTemp_control, errorcTemp_1ppm, errorcTemp_10ppm, errorcTemp_20ppm, errorcTemp_30ppm, errorcTemp_40ppm];
L = [L_control, L_1ppm, L_10ppm, L_20ppm, L_30ppm, L_40ppm];
errorL = [errorL_control, errorL_1ppm, errorL_10ppm, errorL_20ppm, errorL_30ppm, errorL_40ppm];

figure
errorbar(conc,R,errorR,'ro-','LineWidth',lw)
xlabel('Concentration (ppm)','FontSize',axesSize)
ylabel('Average Reading','FontSize',axesSize)
title('Red Channel','FontSize',titleSize)
print('redVsConc','-dpng')

figure
e = errorbar(conc,G,errorG,'o-','LineWidth',lw);
e.Color = dg;
xlabel('Concentration (ppm)','FontSize',axesSize)
ylabel('Average Reading','FontSize',axesSize)
title('Green Channel','FontSize',titleSize)
print('greenVsConc','-dpng')


figure
errorbar(conc,B,errorB,'bo-','LineWidth',lw)
xlabel('Concentration (ppm)','FontSize',axesSize)
ylabel('Average Reading','FontSize',axesSize)
title('Blue Channel','FontSize',titleSize)
print('blueVsConc','-dpng')


figure
errorbar(conc,C,errorC,'co-','LineWidth',lw)
xlabel('Concentration (ppm)','FontSize',axesSize)
ylabel('Average Reading','FontSize',axesSize)
title('Clear Channel','FontSize',titleSize)
print('clearVsConc','-dpng')

figure
errorbar(conc,L,errorL,'mo-','LineWidth',lw)
xlabel('Concentration (ppm)','FontSize',axesSize)
ylabel('Average Reading','FontSize',axesSize)
title('Lux Channel','FontSize',titleSize)
print('luxVsConc','-dpng')

figure
e = errorbar(conc,cTemp,errorcTemp,'o-','LineWidth',lw);
e.Color = o;
xlabel('Concentration (ppm)','FontSize',axesSize)
ylabel('Average Reading','FontSize',axesSize)
title('Color Temperature Channel','FontSize',titleSize)
print('colorTempVsConc','-dpng')

%% calibrate - weigh channels according to average difference between sample points

