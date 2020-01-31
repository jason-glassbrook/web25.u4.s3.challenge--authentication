const request = require ('supertest')
const server = require ('./server')
const db = require ('../database/dbConfig')
const Users = require ('../users/users-model')

describe ('server', () => {

  /// STUFF HAPPENS AT ALL ///
  test (`runs tests`, () => {

    expect (true) .toBe (true)

  })

  /// CHECK SERVER ENVIRONMENT ///
  describe (`server environment`, () => {

    test (`needs to be testing`, () => {

      expect (process.env.SERVER_ENV) .toEqual ('testing')

    })

  })

  /// ONLY DO THIS IF IN TESTING MODE ///

  if (process.env.SERVER_ENV === 'testing') {

    const data = {
      'bad' : {
        'wrong' : `this isn't right`,
      },
      'good' : {
        'username' : `qwerty`,
        'password' : `qwerty123!`,
      },
    }

    /***************************************
      USER REGISTRATION
    ***************************************/

    describe ('POST /api/auth/register', () => {

      beforeEach (async () => {
        await db ('users') .truncate ()
      })

      afterAll (async () => {
        await db ('users') .truncate ()
      })

      /// BAD REQUESTS ARE BAD? ///

      describe (`what happens when request does not have username, password`, () => {

        /// STATUS CODE? ///

        test (`responds with 400 BAD REQUEST`, () => {

          return (
            request (server)
            .post ('/api/auth/register')
            .send (data.bad)
            .then ((ro) => {
              expect (ro.status) .toEqual (400)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, () => {

          return (
            request (server)
            .post ('/api/auth/register')
            .send (data.bad)
            .then ((res) => {
              expect (res.type).toMatch (/json/i)
            })
          )

        })

      })

      /// GOOD REQUESTS ARE GOOD? ///

      describe (`what happens when request has username, password`, () => {

        /// STATUS CODE? ///

        test (`responds with 200 OK`, () => {

          return (
            request (server)
            .post ('/api/auth/register')
            .send (data.good)
            .then ((ro) => {
              expect (ro.status) .toEqual (200)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, () => {

          return (
            request (server)
            .post ('/api/auth/register')
            .send (data.good)
            .then ((res) => {
              expect (res.type).toMatch (/json/i)
            })
          )

        })

      })

    })

    /***************************************
      USER LOGIN
    ***************************************/

    describe ('POST /api/auth/login', () => {

      beforeAll (async () => {
        await db ('users') .truncate ()

        request (server)
        .post ('/api/auth/register')
        .send (data.good)
        .then ((ro) => {
          expect (ro.status) .toEqual (200)
        })
      })

      afterAll (async () => {
        await db ('users') .truncate ()
      })

      /// BAD REQUESTS ARE BAD? ///

      describe (`what happens when request does not have username, password`, () => {

        /// STATUS CODE? ///

        test (`responds with 400 BAD REQUEST`, () => {

          return (
            request (server)
            .post ('/api/auth/login')
            .send (data.bad)
            .then ((ro) => {
              expect (ro.status) .toEqual (400)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, () => {

          return (
            request (server)
            .post ('/api/auth/login')
            .send (data.bad)
            .then ((res) => {
              expect (res.type).toMatch (/json/i)
            })
          )

        })

      })

      /// GOOD REQUESTS ARE GOOD? ///

      describe (`what happens when request has username, password`, () => {

        /// STATUS CODE? ///

        test (`responds with 200 OK`, () => {

          return (
            request (server)
            .post ('/api/auth/login')
            .send (data.good)
            .then ((ro) => {
              expect (ro.status) .toEqual (200)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, () => {

          return (
            request (server)
            .post ('/api/auth/login')
            .send (data.good)
            .then ((res) => {
              expect (res.type).toMatch (/json/i)
            })
          )

        })

      })

    })

  }

})
