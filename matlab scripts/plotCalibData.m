function[slopes,intercepts,rSquares] = plotCalibData(typeOfTest, values,n)

format short e; close all;

%% plotting parameters
axesSize = 16;
tickSize = 12;
titleSize = 16;
markerSize = 4;
legSize = 16;
lw = 1;
dg = [0 0.7 0];
or = [1 .5 0];
cy = [0 .8 .8];


%% filenames
filenames = cell(1,length(values));
for i=1:length(values)
    if (strcmp(typeOfTest,'color'))
        unit = 'ppm';
        xVar = 'Concentration';
        filenames{i} = sprintf('%sTest_%dppm.txt',typeOfTest,values(i));
    elseif (strcmp(typeOfTest,'turbidity'))
        unit = 'ntu';
        xVar = 'Turbdidity';
        filenames{i} = sprintf('%sTest_%dntu.txt',typeOfTest,values(i));
    else
        error('Invalid type of test.')
    end
end

%% load data --> 3D matrix
% row = which concentration/turbidity
% column = channel 
% page = each measured time
data = zeros(length(values),6,n);
for i = 1:length(values)
    [cTempvec, Lvec, Rvec, Gvec, Bvec, Cvec] = textread(filenames{i},'Color Temp: %f K - Lux: %f - R: %f G: %f B: %f C: %f');
    channels = [cTempvec, Lvec,Rvec,Gvec,Bvec,Cvec];
    for j=1:6
        data(i,j,:) = channels(:,j);
    end
end

%% plot each channel against time
cmap = colormap(hsv(6));
channelNames = {'Color Temp'; 'Lux';'Red';'Green';'Blue';'Clear'};
valueLabels = cell(1,length(values));
for k = 1:length(values)
    valueLabels{k} = sprintf('%d %s',values(k),unit);
end

% row = which concentration/turbidity
% column = channel 
% page = each measured time
for j = 1:length(channelNames)
    figure
    for i = 1:length(values)
       plot(squeeze(data(i,j,:)),'Linewidth',lw)
       hold all
    end
    hold off
    xlabel('Time (samples)','FontSize',axesSize)
    ylabel(channelNames{j},'FontSize',axesSize)
    titleString = sprintf('%s Readings vs Time',channelNames{j});
    title(titleString,'FontSize',titleSize)
    leg = legend(valueLabels);
    set(leg,'FontSize',legSize)
    
    figName = sprintf('%sVsTime',channelNames{j});
    print(figName,'-dpng')

end


%% plot average reading for each channel vs. concentration/turbidity

% now have 2D matrix where:
% row = which concentration/turbidity
% column = channel 
% channels in order = [cTempvec, Lvec,Rvec,Gvec,Bvec,Cvec];
meanData = mean(data,3);
stdDevData = std(data,0,3);

colors = {or, [1 0 1], [1 0 0], dg, [0 0 1], cy};
% for i = 1:6
%     figure
%     % errorbar(conc,R,errorR,'ro-','LineWidth',lw)
%     e = errorbar(values,squeeze(meanData(:,i)),squeeze(stdDevData(:,i)),'o-','Linewidth',lw);
%     e.Color = colors{i};
%     xString = sprintf('%s (%s)',xVar,unit);
%     xlabel(xString,'FontSize',axesSize)
%     ylabel(channelNames{i},'FontSize',axesSize)
%     titleString = sprintf('%s Readings vs. %s',channelNames{i},xVar);
%     title(titleString,'FontSize',titleSize)
%     figName = sprintf('%sVs%s',channelNames{j},xVar);
%     print(figName,'-dpng')
% end


%% perform linear fit on each channel
slopes = zeros(1,6);
intercepts = zeros(1,6);
rSquares = zeros(1,6);
for i = 1:6
    % plot each channel as a function of concentration/turbidity
    figure
    % errorbar(conc,R,errorR,'ro-','LineWidth',lw)
    e = errorbar(values,squeeze(meanData(:,i)),squeeze(stdDevData(:,i)),'o','Linewidth',lw);
    e.Color = colors{i};
    
    % perform linear fit and plot
    hold on
    linFit =  fitlm(values,squeeze(meanData(:,i)));
    slopes(i) = linFit.Coefficients.Estimate(1);
    intercepts(i) = linFit.Coefficients.Estimate(2);
    rSquares(i) = linFit.Rsquared.Adjusted;
    plot(values, linFit.Fitted,'--','LineWidth',lw,'Color',colors{i});
    hold off
    xString = sprintf('%s (%s)',xVar,unit);
    xlabel(xString,'FontSize',axesSize)
    ylabel(channelNames{i},'FontSize',axesSize)
    titleString = sprintf('%s Readings vs. %s',channelNames{i},xVar);
    title(titleString,'FontSize',titleSize)
    fitString = sprintf('y = %.3g + %.4g \nR^2 = %.3g',slopes(i),intercepts(i),rSquares(i));
    leg = legend('data',fitString);
    set(leg,'FontSize',legSize)
    
    % save file
    figName = sprintf('%sVs%s',channelNames{j},xVar);
    print(figName,'-dpng')
end

end
