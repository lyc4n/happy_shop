class StoresController < ApplicationController
  def show
    @store = Store.new
  end
end
