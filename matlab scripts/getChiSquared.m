function[chi] = getChiSquared(x)

chiSum = 0;
for i = 1:length(x)
    for j = 1:length(x)
        chiSum = chiSum + (x(i) - x(j)).^2;
    end
end
chi = chiSum;