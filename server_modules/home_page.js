exports.main_page = function(req, res){
  var name = req.query.name
  res.render('main_template', {'name': name, 'chat_active' : 'active'})
};

exports.login = function(req, res){
  res.render('login_template', {'chat_active' : 'active'})
};

exports.stats = function(req, res){
  res.render('stats_template', {'stats_active' : 'active'})
};