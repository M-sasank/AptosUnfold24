module dreamscribe_addr::dreamscribe4 {
    use aptos_framework::event;
    use aptos_std::table;
    use std::signer;
    use std::string;
    use std::vector;

    struct LeaderboardEntry has copy, store {
        user_id: address,
        user_img: string::String,
        user_img_dream: string::String,
        creator_address: address,
        time: u64,
        accuracy: u8,
    }

    struct Game has copy, store,key {
        img: string::String,
        img_dream: string::String,
        creator_address: address,
        resource_id: u64,
        leaderboard: vector<LeaderboardEntry>,
    }

    struct GlobalGames has key {
        games: vector<Game>,
    }

    public entry fun create_game(
    account: &signer,
    img: string::String,
    img_dream: string::String,
    resource_id: u64
) acquires GlobalGames {
    let creator_address = signer::address_of(account);
    let leaderboard = vector::empty<LeaderboardEntry>();
    let game = Game {
        img,
        img_dream,
        creator_address,
        resource_id,
        leaderboard,
    };

    let global_games = borrow_global_mut<GlobalGames>(creator_address);
    vector::push_back(&mut global_games.games, game);
}
#[view]
public fun list_game():vector<Game>acquires GlobalGames{
    let get_all_games=borrow_global<GlobalGames>(@dreamscribe_addr);
    get_all_games.games
}

public entry fun add_attempt(
    account: &signer,
    game_index: u64,
    user_img: string::String,
    user_img_dream: string::String,
    accuracy: u8
) acquires GlobalGames {
    let user_id = signer::address_of(account);
    let time = 0; // Replace this with an actual timestamp implementation
    let global_games = borrow_global_mut<GlobalGames>(user_id);
    
    // Correct borrowing and accessing the game
    let game = vector::borrow_mut(&mut global_games.games, game_index);
    let entry = LeaderboardEntry {
        user_id,
        user_img,
        user_img_dream,
        creator_address: game.creator_address, // Fixed access
        time,
        accuracy,
    };

    vector::push_back(&mut game.leaderboard, entry); // Fixed leaderboard access
}



    public entry fun initialize(account: &signer) {
        let global_games = GlobalGames {
            games: vector::empty<Game>(),
        };
        move_to(account, global_games);
    }
}


