let updateFollowingTeams = async function (new_teams) {
    let tttt = ["Patriots", "Bucaneers"];
    let updatedUser = await User.findByIdAndUpdate(
        info._id,
        {$push: {"following": tttt}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
}
