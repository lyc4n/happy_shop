class JsonApiConstraint
  def matches?(request)
    jsonapi = Mime::Type.lookup_by_extension(:jsonapi)
    request.content_type == jsonapi && request.accept == jsonapi
  end
end

