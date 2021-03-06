'use strict'

exports.handle = (client) => {
  var c_Cats = 0
  let catImages = 
        [
         'http://24.media.tumblr.com/tumblr_lzoc33JZ7k1qb7j67o1_250.jpg',
         'http://25.media.tumblr.com/tumblr_m305x9BSQv1qzex9io1_250.jpg',
         'http://24.media.tumblr.com/tumblr_lzoc33JZ7k1qb7j67o1_250.jpg',
         'http://25.media.tumblr.com/tumblr_kp2kxdwTpr1qzv5pwo1_250.jpg',
         'http://24.media.tumblr.com/tumblr_m4h71yrFH51rwcc6bo1_250.gif',
         'http://25.media.tumblr.com/tumblr_m3b5dhmcLF1qzyqubo1_250.jpg',
         'http://25.media.tumblr.com/tumblr_li6itvRslB1qfyzelo1_250.jpg',
         'http://24.media.tumblr.com/Jjkybd3nSces48pnerQxzaA2_250.jpg',
         'http://24.media.tumblr.com/tumblr_m3zxc1DryY1qgg1kko1_250.gif',
         'http://25.media.tumblr.com/tumblr_m1zq28KU901qz4dkmo1_250.jpg',
         'http://25.media.tumblr.com/tumblr_m1fp79Zi4g1qzmicpo1_1280.jpg',
         'http://25.media.tumblr.com/tumblr_ly42s96TLy1qlyuwso1_250.jpg',
         'http://25.media.tumblr.com/tumblr_lnq3h8317N1qbt33io1_250.jpg',
         'http://24.media.tumblr.com/tumblr_mats6jFFhQ1r6jd7fo1_250.jpg',
         'http://24.media.tumblr.com/tumblr_m47ekdZVVx1qze0hyo1_250.jpg',
         'http://24.media.tumblr.com/tumblr_lxyk6s455e1qb73tpo1_250.gif',
         'http://24.media.tumblr.com/tumblr_m3mszrNf9b1r73wdao1_250.jpg',
         'http://25.media.tumblr.com/tumblr_m3outyVHt91r73wdao1_250.gif',
         'http://24.media.tumblr.com/tumblr_m4vzfxxw271r6b7kmo1_250.jpg',
         'http://24.media.tumblr.com/tumblr_m2kye3YDLH1qbe5pxo1_250.jpg',
         'http://25.media.tumblr.com/tumblr_m22hyh77PL1qmqlwso1_r1_250.jpg',
         'http://24.media.tumblr.com/tumblr_m38o9dD0O41r6b7kmo1_250.jpg',
         'http://25.media.tumblr.com/tumblr_m6fcg8MemM1qddbvio1_250.jpg',
         'http://24.media.tumblr.com/Jjkybd3nS9i6zksnMNDu4kGk_250.jpg',
         'http://24.media.tumblr.com/tumblr_m4nxpqJbjB1qd477zo1_250.jpg',
         'http://25.media.tumblr.com/tumblr_m4rlz1mSlk1qd477zo1_250.jpg',
         'http://24.media.tumblr.com/tumblr_m3s4p3vRuD1r73wdao1_250.jpg',
         'http://24.media.tumblr.com/tumblr_low6rhcPh61qbhms5o1_250.jpg',
         'http://25.media.tumblr.com/tumblr_lp9s3w55HO1qbt33io1_250.jpg',
         'http://24.media.tumblr.com/tumblr_lvif70646v1r61ltjo1_250.jpg',
         'http://25.media.tumblr.com/Jjkybd3nSaqb79iamzZBs63e_250.jpg',
         'http://25.media.tumblr.com/tumblr_m4qwu7XeDq1rrhjaso1_250.jpg',
         'http://25.media.tumblr.com/tumblr_m3rw72Oyzw1rpokdio1_250.gif'
        ]

        //http://thecatapi.com/api/images/get?api_key=MTQ2ODUw&size=small

  // Create steps
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('greeting')
      // client.addResponse('provide/documentation', {
      //   documentation_link: 'http://docs.init.ai',
      // })
      // client.addResponse('provide/instructions')

      client.updateConversationState({
        helloSent: true
      })

      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })

  const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('greeting')
      client.done()
    }
  })

  const handleGoodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('goodbye')
      client.done()
    }
  })

  const handleThanks = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('thanks')
      client.done()
    }
  })

  const collectCity = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().weatherCity)
    },

    extractInfo() {
      const city = client.getFirstEntityWithRole(client.getMessagePart(), 'city')

      if (city) {
        client.updateConversationState({
          weatherCity: city,
        })

        console.log('User wants the weather in:', city.value)
      }
    },

    prompt() {
      client.addResponse('prompt/weather_city')
      client.done()
    },
  })

  const provideWeather = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      let weatherData = {
        temperature: 29,
        condition: 'ensolarado',
        city: client.getConversationState().weatherCity.value,
      }

      client.addResponse('provide_weather/current', weatherData)
      client.done()
    }
  })

  const collectUserInterest = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().botInfo)
    },

    extractInfo() {
      const userInterest = client.getFirstEntityWithRole(client.getMessagePart(), 'interest')

      if (userInterest) {
        client.updateConversationState({
          botInfo: userInterest,
        })

        console.log('User is interessed in:', userInterest.value)
      }
    },

    prompt() {
      client.addResponse('prompt/user_interest')
      client.done()
    },
  })

  const provideBotInfo = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      let botInformation = {
        interest: client.getConversationState().botInfo.value,
      }

      if (botInformation.interest == 'nome'){
        client.addResponse('provide_bot/name')
      }

      else if (botInformation.interest == 'idade'){
        client.addResponse('provide_bot/age')
      }

      else {
        client.addResponse('apology/untrained')
      }

      client.done()
    }
  })

  const provideBotFeedback = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      let subClassification = client.getMessagePart().classification.sub_type.value
      console.log ('teste' + subClassification)

      if (subClassification === 'positive') {
        client.addResponse('provide_feedback_adjective/positive')
      } 

      else if (subClassification === 'negative') {
        client.addResponse('provide_feedback_adjective/negative')
      }

      else {
        client.addResponse('apology/untrained')
      }

      client.done()
    }
  })

  const provideHumorFeedback = client.createStep({
    satisfied() {
      c_Cats = Math.floor((Math.random() * 32) + 1)

      return false
    },

    prompt() {
      client.addResponse('provide_feedback_humor/negative') 
      client.addImageResponse(catImages[c_Cats + 1])
      client.done()
    }
  })

  const provideAttentionFeedback = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('provide_user_attention')
      client.done()
    }
  })
  
  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
      goodbye: 'goodbye',
      greeting: 'greeting',
      thanks: 'thanks',
      ask_current_weather: 'getWeather',
      ask_bot_info: 'getBotInfo',
      ask_bot_attention: 'getBotAttention',
      feedback_bot_adjective: 'getBotFeedback',
      feedback_user_humor: 'getHumorFeedback'
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      greeting: handleGreeting,
      goodbye: handleGoodbye,
      thanks: handleThanks,
      getWeather: [collectCity, provideWeather],
      getBotInfo: [collectUserInterest, provideBotInfo],
      getBotFeedback: provideBotFeedback,
      getBotAttention: provideAttentionFeedback,
      getHumorFeedback: provideHumorFeedback,
    main: 'onboarding',
    onboarding: [sayHello],
    end: [untrained]
    },
  })
}
