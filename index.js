import { tweetsData } from "./data.js"

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetFeed = document.getElementById("feed")



/* Making the entire HTML document listen for clicks */
 document.addEventListener("click", function(e) {
    if(e.target.dataset.like) {
        likeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet) {
        retweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply) {
        replyClick(e.target.dataset.reply)
    }
    else if(e.target.id === "tweet-btn") {
        tweetBtnClick()
    }
 })

function likeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(uid) {
        return uid.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes-- 
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    
    renderFeed()
}
function retweetClick(tweetId) {
    const retweetedObj = tweetsData.filter(function(usid) {
        return usid.uuid === tweetId
    })[0]
    if(retweetedObj.isRetweeted) {
        retweetedObj.retweets--
    } else {
        retweetedObj.retweets++
    }
    retweetedObj.isRetweeted = !retweetedObj.isRetweeted
    renderFeed()
}

function replyClick(replyId) {
    const replyTweet = document.getElementById(`replies-${replyId}`)
    replyTweet.classList.toggle("hidden")
}


function tweetBtnClick() {

    const tweetInput = document.getElementById("tweet-input")

    if (tweetInput.value) {
        tweetsData.unshift(({
            handle: `@Nastradome`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        }))
    }
    renderFeed()
    tweetInput.value = ""
}

function getFeed() {
                    let feedHtml = ""
                    tweetsData.forEach(function(feed) {
                        let likeIcon = ""
                        let retweetIcon = ""
                        if (feed.isLiked) {
                            
                            likeIcon ="liked"
                        }
                        if (feed.isRetweeted) {
                            
                            retweetIcon = "retweeted"
                        }
                        let repliesHtml = ""
                        if(feed.replies.length > 0) {
                            
                            feed.replies.forEach(function(reply) {

                                repliesHtml += `<div class="tweet-reply">
                                                    <div class="tweet-inner">
                                                        <img src="${reply.profilePic}" class="profile-pic">
                                                            <div>
                                                                <p class="handle">${reply.handle}</p>
                                                                <p class="tweet-text">${reply.tweetText}</p>
                                                            </div>
                                                    </div>
                                                </div>`
                            })

                        }

                        feedHtml += 
                        `<div class="tweet">
                            <div class="tweet-inner">
                                <img src="${feed.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${feed.handle}</p>
                                    <p class="tweet-text">${feed.tweetText}</p>
                                    <div class="tweet-details">
                                        <span class="tweet-detail">
                                            <i class="fa-regular fa-comment-dots" data-reply="${feed.uuid}"></i>
                                            ${feed.replies.length}
                                        </span>
                                        <span class="tweet-detail">
                                            <i class="fa-solid fa-heart ${likeIcon}" data-like="${feed.uuid}"></i>
                                            ${feed.likes}
                                        </span>
                                        <span class="tweet-detail">
                                            <i class="fa-solid fa-retweet ${retweetIcon}" data-retweet="${feed.uuid}"></i>
                                            ${feed.retweets}
                                        </span>
                                    </div>   
                                </div>            
                            </div>
                            <div class="hidden" id="replies-${feed.uuid}">
                                ${repliesHtml}
                            </div>
                        </div>`
})
return feedHtml
}

function renderFeed() {
    tweetFeed.innerHTML = getFeed()
}

renderFeed()