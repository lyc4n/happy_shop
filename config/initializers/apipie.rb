Apipie.configure do |config|
  config.app_name                = "HappyShop"
  config.api_base_url            = "/api"
  config.doc_base_url            = "/apidoc"
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/**/*.rb"
  config.default_version         = "1"
  config.translate               = false
  config.default_locale          = nil
end
