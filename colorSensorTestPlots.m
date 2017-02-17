clear; clc; format short e; close all;

%% plotting parameters
axesSize = 16;
tickSize = 12;
titleSize = 16;
markerSize = 4;
legSize = 16;
lw = 1;
dg = [0 0.7 0];

%% load data
[colorTemp_control, Lvec_control, Rvec_control, Gvec_control, Bvec_control, Cvec_control] = textread('colorTest_control.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_control = length(Rvec_control)

[colorTemp_1ppm, Lvec_1ppm, Rvec_1ppm, Gvec_1ppm, Bvec_1ppm, Cvec_1ppm] = textread('colorTest_1ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_1ppm = length(Rvec_1ppm)

[colorTemp_10ppm, Lvec_10ppm, Rvec_10ppm, Gvec_10ppm, Bvec_10ppm, Cvec_10ppm] = textread('colorTest_10ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_10ppm = length(Rvec_10ppm)

[colorTemp_20ppm, Lvec_20ppm, Rvec_20ppm, Gvec_20ppm, Bvec_20ppm, Cvec_20ppm] = textread('colorTest_20ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_20ppm = length(Rvec_20ppm)

[colorTemp_30ppm, Lvec_30ppm, Rvec_30ppm, Gvec_30ppm, Bvec_30ppm, Cvec_30ppm] = textread('colorTest_30ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_30ppm = length(Rvec_30ppm)

[colorTemp_40ppm, Lvec_40ppm, Rvec_40ppm, Gvec_40ppm, Bvec_40ppm, Cvec_40ppm] = textread('colorTest_40ppm.txt','Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
length_40ppm = length(Rvec_40ppm)

%% plot against time

figure
subplot(2,2,1)
plot(Rvec_1ppm,'r-','LineWidth',lw)
hold on
plot(Rvec_10ppm,'r--','LineWidth',lw)
plot(Rvec_20ppm,'r:','LineWidth',lw)
plot(Rvec_30ppm,'r-.','LineWidth',lw)
plot(Rvec_40ppm,'r+-','LineWidth',lw)
plot(Rvec_control,'r*-','LineWidth',lw)
hold off
xlabel('Time')
ylabel('R value')
title('Red Channel Readings')
legend('1ppm','10ppm','30ppm','40ppm','control')

subplot(2,2,2)
plot(Gvec_1ppm,'-','Color',dg,'LineWidth',lw)
hold on
plot(Gvec_10ppm,'--','Color',dg,'LineWidth',lw)
plot(Gvec_20ppm,':','Color',dg,'LineWidth',lw)
plot(Gvec_30ppm,'-.','Color',dg,'LineWidth',lw)
plot(Gvec_40ppm,'+-','Color',dg,'LineWidth',lw)
plot(Gvec_control,'*-','Color',dg,'LineWidth',lw)
hold off
xlabel('Time')
ylabel('G value')
title('Green Channel Readings')
legend('1ppm','10ppm','20ppm','30ppm','40ppm','control')

subplot(2,2,3)
plot(Bvec_1ppm,'b-','LineWidth',lw)
hold on
plot(Bvec_10ppm,'b--','LineWidth',lw)
plot(Bvec_20ppm,'b:','LineWidth',lw)
plot(Bvec_30ppm,'b-.','LineWidth',lw)
plot(Bvec_40ppm,'b+-','LineWidth',lw)
plot(Bvec_control,'b*-','LineWidth',lw)
hold off
xlabel('Time')
ylabel('B value')
title('Blue Channel Readings')
legend('1ppm','10ppm','20ppm','30ppm','40ppm','control')

subplot(2,2,4)
plot(Cvec_1ppm,'c-','LineWidth',lw)
hold on
plot(Cvec_10ppm,'c--','LineWidth',lw)
plot(Cvec_20ppm,'c:','LineWidth',lw)
plot(Cvec_30ppm,'c-.','LineWidth',lw)
plot(Cvec_40ppm,'c+-','LineWidth',lw)
plot(Cvec_control,'c*-','LineWidth',lw)
hold off
xlabel('Time')
ylabel('C value')
title('Clear Channel Readings')
legend('1ppm','10ppm','20ppm','30ppm','40ppm','control')

print('readingVsTime','-dpng')


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

% sample 10ppm
R_10ppm = mean(Rvec_10ppm);
errorR_10ppm = std(Rvec_10ppm);

G_10ppm = mean(Gvec_10ppm);
errorG_10ppm = std(Gvec_10ppm);

B_10ppm = mean(Bvec_10ppm);
errorB_10ppm = std(Bvec_10ppm);

C_10ppm = mean(Cvec_10ppm);
errorC_10ppm = std(Cvec_10ppm);

% sample 20ppm
R_20ppm = mean(Rvec_20ppm);
errorR_20ppm = std(Rvec_20ppm);

G_20ppm = mean(Gvec_20ppm);
errorG_20ppm = std(Gvec_20ppm);

B_20ppm = mean(Bvec_20ppm);
errorB_20ppm = std(Bvec_20ppm);

C_20ppm = mean(Cvec_20ppm);
errorC_20ppm = std(Cvec_20ppm);

% sample 30ppm
R_30ppm = mean(Rvec_30ppm);
errorR_30ppm = std(Rvec_30ppm);

G_30ppm = mean(Gvec_30ppm);
errorG_30ppm = std(Gvec_30ppm);

B_30ppm = mean(Bvec_30ppm);
errorB_30ppm = std(Bvec_30ppm);

C_30ppm = mean(Cvec_30ppm);
errorC_30ppm = std(Cvec_30ppm);

% sample 40ppm
R_40ppm = mean(Rvec_40ppm);
errorR_40ppm = std(Rvec_40ppm);

G_40ppm = mean(Gvec_40ppm);
errorG_40ppm = std(Gvec_40ppm);

B_40ppm = mean(Bvec_40ppm);
errorB_40ppm = std(Bvec_40ppm);

C_40ppm = mean(Cvec_40ppm);
errorC_40ppm = std(Cvec_40ppm);


% sample control
R_control = mean(Rvec_control);
errorR_control = std(Rvec_control);

G_control = mean(Gvec_control);
errorG_control = std(Gvec_control);

B_control = mean(Bvec_control);
errorB_control = std(Bvec_control);

C_control = mean(Cvec_control);
errorC_control = std(Cvec_control);

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

figure
subplot(2,2,1)
errorbar(conc,R,errorR,'ro-','LineWidth',lw)
xlabel('Concentration (ppm)')
ylabel('Average Reading')
title('Red Channel')
subplot(2,2,2)
errorbar(conc,G,errorG,'go-','LineWidth',lw)
xlabel('Concentration (ppm)')
ylabel('Average Reading')
title('Green Channel')
subplot(2,2,3)
errorbar(conc,B,errorB,'bo-','LineWidth',lw)
xlabel('Concentration (ppm)')
ylabel('Average Reading')
title('Blue Channel')
subplot(2,2,4)
errorbar(conc,C,errorC,'co-','LineWidth',lw)
xlabel('Concentration (ppm)')
ylabel('Average Reading')
title('Clear Channel')
print('readingVsConc','-dpng')


%% calibrate - weigh channels according to average difference between sample points
