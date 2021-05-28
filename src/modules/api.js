import axios from 'axios';

class MGGApi {
    apiBase = "";

    constructor(useStagingApi = false) {
        if(useStagingApi) {
            this.apiBase = "http://localhost:1337/api/v1/";
        } else {
            this.apiBase = "https://mygarage.games/api/v1/";
        }
    }

    async authLogin(username, password) {
        try {
            const response = await axios.post(this.apiBase + 'auth/login', {
                "username": username,
                "password": password
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USER_NOT_FOUND":
                    throw new UserNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async authVerify(jwtToken) {
        try {
            const response = await axios.post(this.apiBase + 'auth/verify', {
                "token": jwtToken,
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async authRegister(username, password, email) {
        try {
            const response = await axios.post(this.apiBase + 'users', {
                "username": username,
                "password": password,
                "email": email
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USERNAME_EMAIL_CONFLICT":
                    throw new UsernameEmailConflictException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getAllGames() {
        try {
            const response = await axios.get(this.apiBase + 'games');

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getAllChannels() {
        try {
            const response = await axios.get(this.apiBase + 'gameChannels');

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getChannelDetail(channelID) {
        try {
            const response = await axios.get(this.apiBase + 'gameChannels/' + channelID);

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAMECHANNEL_NOT_FOUND":
                    throw new GameChannelNotFoundException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getGameDetail(gameID) {
        try {
            const response = await axios.get(this.apiBase + 'games/' + gameID);

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new GameNotFoundException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async postGame(gamePayload, jwtToken) {
        try {
            const response = await axios.post(this.apiBase + 'games', gamePayload, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_INGAMEID_WRONGFORMAT":
                    throw new IngameIDWrongFormatException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async updateGame(gameID, gamePayload, jwtToken) {
        try {
            const response = await axios.put(this.apiBase + 'games/' + gameID, gamePayload, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_INGAMEID_WRONGFORMAT":
                    throw new IngameIDWrongFormatException(error.response.data.text);
                case "GAME_NOT_FOUND":
                    throw new GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async updateGameCover(gameID, coverFile, jwtToken) {
        try {
            let formData = new FormData();
            formData.append('cover', coverFile);

            const response = await axios.put(this.apiBase + 'games/' + gameID + '/cover', formData, {
                headers: {
                    "x-access-token": jwtToken,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new GameNotFoundException(error.response.data.text);
                case "GAME_COVER_WRONGFORMAT":
                    throw new FileWrongFormatException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteGameCover(gameID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'games/' + gameID + '/cover', {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteGame(gameID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'games/' + gameID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async uploadGameScreenshots(gameID, files, jwtToken) {
        try {
            let formData = new FormData();
            files.forEach(file => {
                formData.append('screenshots', file);
            });

            const response = await axios.post(this.apiBase + 'gameScreenshots/' + gameID, formData, {
                headers: {
                    "x-access-token": jwtToken,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new GameNotFoundException(error.response.data.text);
                case "GAMESCREENSHOT_COVER_WRONGFORMAT":
                    throw new FileWrongFormatException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteGameScreenshot(screenshotID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'gameScreenshots/' + screenshotID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new GameNotFoundException(error.response.data.text);
                case "GAMESCREENSHOT_NOT_FOUND":
                    throw new GameScreenshotNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getUserDetail(userID) {
        try {
            const response = await axios.get(this.apiBase + 'users/' + userID);

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USER_NOT_FOUND":
                    throw new UserNotFoundException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    static isUsernameValid(unfilteredUsername) {
        let usernameRegex = /^[a-zA-Z0-9-_]*$/g;
    
        return usernameRegex.test(unfilteredUsername);
    }
    
    static isCreatorIDValid(unfilteredCreatorID) {
        let creatorIDRegex = /^P-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/g;
    
        return creatorIDRegex.test(unfilteredCreatorID);
    }
    
    static isGameIDValid(unfilteredGameID) {
        let gameIDRegex = /^G-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/g;
    
        return gameIDRegex.test(unfilteredGameID);
    }
}

class AuthenticationNeededException extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationNeededException";
    }
}

class AuthenticationWrongException extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationWrongException";
    }
}

class UserNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "UserNotFoundException";
    }
}

class UsernameEmailConflictException extends Error {
    constructor(message) {
        super(message);
        this.name = "UsernameEmailConflictException";
    }
}

class GameChannelNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "GameChannelNotFoundException";
    }
}

class GameNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "GameNotFoundException";
    }
}

class GameScreenshotNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "GameScreenshotNotFoundException";
    }
}

class IngameIDWrongFormatException extends Error {
    constructor(message) {
        super(message);
        this.name = "IngameIDWrongFormatException";
    }
}

class FileWrongFormatException extends Error {
    constructor(message) {
        super(message);
        this.name = "FileWrongFormatException";
    }
}

export default MGGApi;