#Logistic regression testing for jsRegress

library(tidyverse)
library(magrittr)
library(jsonlite)
library(broom)

data <- read_csv("~/comps/jsRegress/examples/logistic_regression/logisticData.csv")

model <- glm(y ~ x1 + x2, data, family = binomial)
tidy(model)

X = data %>% mutate(int = 1) %>% select(int, x1, x2) %>%  as.matrix()
Y = data %>% select(y) %>% as.matrix()
logistic <- function(x) 1/ (1 + exp(-x))

B = matrix(c(0,0,0))

for(i in 1:22){
  p = X %*% B %>% apply(1:2, logistic )
  W = p  %>% apply(1:2, function(p) p/(1-p) ) %>% .[,1] %>%  diag()
  B_change = solve( (t(X) %*% W %*% X) ) %*% t(X) %*% (Y - p) 
  B = B + B_change
}
print(B)

