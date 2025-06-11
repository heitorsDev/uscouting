
class matchRegister{
    constructor (match_number, alliance_color, starting_position, auto_high_specimens, auto_low_specimens, auto_high_baskets, auto_low_baskets, auto_park, teleop_high_specimens, teleop_low_specimens, teleop_high_baskets, teleop_low_baskets, ascent, penalty, penalty_description, description, team_number, user_scout_id) {
        this.match_number = match_number
        this.alliance_color = alliance_color
        this.starting_position = starting_position
        this.auto_high_specimens = auto_high_specimens
        this.auto_low_specimens = auto_low_specimens
        this.auto_high_baskets = auto_high_baskets
        this.auto_low_baskets = auto_low_baskets
        this.auto_park = auto_park
        this.teleop_high_specimens = teleop_high_specimens
        this.teleop_low_specimens = teleop_low_specimens
        this.teleop_high_baskets = teleop_high_baskets
        this.teleop_low_baskets = teleop_low_baskets
        this.ascent = ascent
        this.penalty = penalty
        this.penalty_description = penalty_description
        this.description = description
        this.team_number = team_number
        this.user_scout_id = user_scout_id
    }
}

class pitRegister{
    constructor (auto_high_specimens, auto_low_specimens, auto_high_baskets, auto_low_baskets, auto_park, teleop_high_specimens, teleop_low_specimens, teleop_high_baskets, teleop_low_baskets, ascent, team_number, user_scout_id) {
        this.auto_high_specimens = auto_high_specimens
        this.auto_low_specimens = auto_low_specimens
        this.auto_high_baskets = auto_high_baskets
        this.auto_low_baskets = auto_low_baskets
        this.auto_park = auto_park
        this.teleop_high_specimens = teleop_high_specimens
        this.teleop_low_specimens = teleop_low_specimens
        this.teleop_high_baskets = teleop_high_baskets
        this.teleop_low_baskets = teleop_low_baskets
        this.ascent = ascent
        this.team_number = team_number
        this.user_scout_id = user_scout_id
    }
}
class teamRegister{
    constructor (name, number) {
        this.name = name
        this.number = number
    }
}
class userRegister {
    constructor(name, password, privilege = null, id = null) {
        this.name = name
        this.password = password
        this.privilege = privilege
        this.id = id
    }
}

module.exports = {
    matchRegister,
    pitRegister,
    teamRegister,
    userRegister
}