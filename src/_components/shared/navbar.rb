class Shared::Navbar < Bridgetown::Component
  LINKS = {
    "Le club" => "/#club",
    "Le taekwondo" => "/#taekwondo",
    "Horaires" => "/#horaires",
    "Nous rejoindre" => "/#rejoindre",
    "Contact" => "/#contact"
  }.freeze

  def initialize(metadata:, resource:)
    @metadata, @resource = metadata, resource
  end
end
