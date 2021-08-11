const { Router } = require('express');

const router = Router();

const jwt = require('express-jwt');
const authorizationMiddleware = jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ['HS256'] });

const eventController = require('./controllers/eventsController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const wishListController = require('./controllers/wishListController');
const calendarController = require('./controllers/calendarController');

const adminController = require('./controllers/adminController');


// Routes Event Controller
router.get('/activities', eventController.findAllEvents); 
router.post('/activities', eventController.findAllEventsNextPage); 
router.post('/activities/category', eventController.findEventsByCategories); 
router.post('/activities/input', eventController.findEventsByUserInput); 
router.post('/activities/search', eventController.findEventsByCatAndInput); 
router.get('/activities/show/:event', eventController.findLiveShows); 


// Routes Auth Controller
router.post('/login/', authController.login);
router.post('/signup', authController.signup);

// Routes User Controller
router.get('/profile', authorizationMiddleware, userController.findOne);
router.patch('/profile', authorizationMiddleware, userController.modifyOneInfoInProfile);
router.patch('/profile/img', authorizationMiddleware, userController.modifyImgInProfile);
router.delete('/profile/delete', authorizationMiddleware, userController.deleteOne);

// Routes WishList Controller 
router.get('/wishlist', authorizationMiddleware, wishListController.findWishListByUserId);
router.post('/wishlist/add', authorizationMiddleware, wishListController.addOneActivityToWhishList);
router.post('/wishlist/delete', authorizationMiddleware, wishListController.deleteOneActivityToWhishList);
router.get('/wishlist/delete/all', authorizationMiddleware, wishListController.deleteAllActivitiesToWishList);

// Route Calendar Controller 
router.get('/calendar', authorizationMiddleware, calendarController.findCalendarByUser);
router.post('/calendar/add', authorizationMiddleware, calendarController.addOneActivityToCalendar);
router.post('/calendar/delete', authorizationMiddleware, calendarController.deleteOneActivityInCalendar);
router.get('/calendar/delete/all', authorizationMiddleware, calendarController.deleteAllActivitiesInCalendar);
router.patch('/calendar/modify', authorizationMiddleware, calendarController.modifyOneActivityInCalendar)


// Route Admin Controller

// ==== Admin =====
router.get('/admin/count', adminController.getCountInstanceAllTable);

// ==== User =====
router.get('/admin/users', adminController.findAllUser);
router.post('/admin/user', adminController.findOneUser);
router.patch('/admin/user/update', adminController.updateUser);
router.delete('/admin/user/delete/:id', adminController.deleteUser);

// ==== Activity =====
router.get('/admin/activities', adminController.findAllActivity);
router.post('/admin/activity', adminController.findOneActivity);
router.patch('/admin/activity/update', adminController.updateActivity);
router.delete('/admin/activity/delete/:id', adminController.deleteActivity);

// ==== WishList =====
router.get('/admin/wishlists', adminController.findAllWishList);
router.delete('/admin/wishlist/delete/:id', adminController.deleteOneActivityTotheWishList);

// ==== Calendar =====
router.get('/admin/calendars', adminController.findAllCalendars);
router.post('/admin/calendar', adminController.findOneCalendar);
router.patch('/admin/calendar/update', adminController.updateCalendar);
router.delete('/admin/calendar/delete/:id', adminController.deleteCalendar);

module.exports = router;