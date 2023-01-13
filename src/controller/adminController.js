const adminController = {};
const passport = require('passport');
const Admin = require('../model/Admin');
const { sendMessage } = require('../redirectsToRoutes/redirectsToRoutes');
const { isEmpty, isAuthenticatedView } = require('../validations/validations');

adminController.renderLogin = async (request, response) => {
	response.render('admin/login.ejs', {
		isAuthenticated: isAuthenticatedView(request)
	});
};

adminController.loginAdmin = passport.authenticate('local', {
	failureRedirect: '/admin/login',
	successRedirect: '/admin/save',
	failureFlash: true
});

adminController.saveAdmin = (request, response) => {
	if (request.user) {
		let finalDate = new Date();
		finalDate.setDate(finalDate.getDate() + 1);
		response.cookie('AdminId', request.user.id, {
			expires: finalDate,
			httpOnly: true,
			secure: true
		});
		response.redirect('/clients');
	}
};

adminController.renderOptions = (request, response) => {
	response.render('admin/admin.ejs', {
		isAuthenticated: isAuthenticatedView(request)
	});
};

adminController.renderFormPassword = (request, response) => {
	response.render('admin/password.ejs', {
		isAuthenticated: isAuthenticatedView(request)
	});
};

adminController.saveNewPassword = async (request, response) => {
	const { oldPassword, newPassword, newPasswordConfirm } = request.body;
	const routeToBack = `/admin/password/${request.cookies.AdminId}`;
	if (isEmpty(oldPassword, newPassword, newPasswordConfirm))
		sendMessage(
			request,
			response,
			'dangerMessage',
			'missing credentials',
			routeToBack
		);
	else if (newPassword != newPasswordConfirm)
		sendMessage(
			request,
			response,
			'dangerMessage',
			'the confirmation password must be the same as the new password',
			routeToBack
		);
	else {
		const admin = await Admin.findById(request.cookies.AdminId);
		const match = await admin.matchPassword(oldPassword);
		if (match) {
			const password = await admin.encryptPassword(newPassword);
			await Admin.findByIdAndUpdate(request.cookies.AdminId, {
				password
			});
			sendMessage(
				request,
				response,
				'successMessage',
				'Password changed',
				'/admin/admin'
			);
		} else {
			sendMessage(
				request,
				response,
				'error',
				'Incorrect password',
				routeToBack
			);
		}
	}
};

adminController.logout = (request, response) => {
	request.logout(function (err) {
		if (err) return next(err);
		response.clearCookie('AdminId');
		sendMessage(
			request,
			response,
			'successMessage',
			'Admin successfylly logged out',
			'/'
		);
	});
};

module.exports = adminController;
