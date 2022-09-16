FROM jekyll/jekyll:pages
RUN gem install jekyll-admin # Install jekyll-admin gem
RUN gem install webrick  # from ruby 3.0. webrick not in ruby, need install