function[chi] = getChiSquared(x)

for i = 1:length(x)
    for j = 1:length(x)
        sum = sum + (x(i) - x(j)).^2;
    end
end
chi = sum;