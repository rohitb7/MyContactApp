'use strict';

/**
 * @ngdoc function
 * @name rohitcontactsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rohitcontactsApp
 */
angular.module('rohitcontactsApp')
    .controller('MainCtrl', function($scope, $firebaseArray, $window) {

        var ref = new Firebase('https://rohitcontacts7.firebaseio.com/contacts');

        $scope.contacts = $firebaseArray(ref);

        //$scope.add = false;

        $scope.showAddForm = function() {
            $scope.showForm = true;
        };

        $scope.showEditForm = function(contact) {
            $scope.editshowForm = true;

            $scope.id = contact.$id;
            $scope.name = contact.name;
            $scope.email = contact.email;

            if (typeof contact.phone === 'undefined') {
                $scope.work_phone = null;
            } else {
                $scope.work_phone = contact.phone[0].work_phone;
            }

            if (typeof contact.phone === 'undefined') {
                $scope.mobile_phone = null;
            } else {
                $scope.mobile_phone = contact.phone[0].mobile_phone;
            }

            if (typeof contact.address === 'undefined') {
                $scope.street_address = null;
            } else {
                $scope.street_address = contact.address[0].street_address;
            }

            if (typeof contact.address === 'undefined') {
                $scope.city = null;
            } else {
                $scope.city = contact.address[0].city;
            }

            if (typeof contact.address === 'undefined') {
                $scope.state = null;
            } else {
                $scope.state = contact.address[0].state;
            }

            if (typeof contact.address === 'undefined') {
                $scope.zipcode = null;
            } else {
                $scope.zipcode = contact.address[0].zipcode;
            }

        };


        $scope.hideForm = function() {
            $scope.showForm = false;
            $scope.contactShow = false;
        };


        $scope.removeContact = function(contact) {

            var deleteContact = $window.confirm('Are you sure you want to delete this contact ?');

            

            if (deleteContact) {
                $scope.contacts.$remove(contact);
                $scope.msg = "Contact Removed";
                console.log("Contact Deleted");
            }


        };

        $scope.addFormSubmit = function() {

            if ($scope.name) {
                var name = $scope.name;
            } else {
                var name = null;
            };

            if ($scope.email) {
                var email = $scope.email;
            } else {
                var email = null;
            };

            if ($scope.mobile_phone) {
                var mobile_phone = $scope.mobile_phone;
            } else {
                var mobile_phone = null;
            };

            if ($scope.work_phone) {
                var work_phone = $scope.work_phone;
            } else {
                var work_phone = null;
            };

            if ($scope.street_address) {
                var street_address = $scope.street_address;
            } else {
                var street_address = null;
            };

            if ($scope.city) {
                var city = $scope.city;
            } else {
                var city = null;
            };

            if ($scope.state) {
                var state = $scope.state;
            } else {
                var state = null;
            };

            if ($scope.zipcode) {
                var zipcode = $scope.zipcode;
            } else {
                var zipcode = null;
            };

            $scope.contacts.$add({
                name: name,
                email: email,
                phone: [{
                    mobile_phone: mobile_phone,
                    work_phone: work_phone
                }],
                address: [{
                    street_address: street_address,
                    city: city,
                    state: state,
                    zipcode: zipcode
                }],

            }).then(function(ref) {
                var id = ref.key();
                $scope.showForm = false;
                clearFields();
                $scope.message = "Contact Added";

            })

        };


        $scope.editFormSubmit = function(id) {
            //get contact id
            var id = $scope.id;
            //Get record
            var record = $scope.contacts.$getRecord(id);


            record.name = $scope.name;

            if (typeof record.email === 'undefined') {
                $scope.email = null;
            } else {
                record.email = $scope.email;
            }

            if (typeof record.phone === 'undefined') {
                $scope.work_phone = "not added";
            } else {
                record.phone[0].work_phone = $scope.work_phone;
            }

            if (typeof record.phone === 'undefined') {
                $scope.mobile_phone = "not added";
            } else {
                record.phone[0].mobile_phone = $scope.mobile_phone;
            }

            if (typeof record.address === 'undefined') {
                $scope.street_address = "not added";
            } else {
                record.address[0].street_address = $scope.street_address;
            }

            if (typeof record.address === 'undefined') {
                $scope.city = "not added";
            } else {
                record.address[0].city = $scope.city;
            }

            if (typeof record.state === 'undefined') {
                $scope.state = "not added";
            } else {
                record.address[0].state = $scope.state;
            }

            if (typeof record.zipcode === 'undefined') {
                $scope.zipcode = "not added";
            } else {
                record.address[0].zipcode = $scope.zipcode;
            }





            $scope.contacts.$save(record).then(function(ref) {
                console.log("Record " + ref.key + " saved!");
            });

            clearFields();
            ///Hid edit form
            $scope.editshowForm = false;
            $scope.message = "Contact Updated";

        };



        $scope.showContact = function(contact) {

            $scope.name = contact.name;
            $scope.email = contact.email;

            if (typeof contact.phone === "undefined") {
                $scope.mobile_phone = "not added";
            } else { $scope.mobile_phone = contact.phone[0].mobile_phone; };

            if (typeof contact.address === "undefined") {
                $scope.street_address = "not added";
            } else { $scope.street_address = contact.address[0].street_address };

            if (typeof contact.address === "undefined") {
                $scope.city = "";
            } else { $scope.city = contact.address[0].city };

            if (typeof contact.address === "undefined") {
                $scope.state = "";
            } else { $scope.state = contact.address[0].state };

            if (typeof contact.address == "undefined") {
                $scope.zipcode = "";
            } else { $scope.zipcode = contact.address[0].zipcode };

            $scope.contactShow = true;

        };

        function clearFields() {
            console.log('cleared')
            $scope.name = '';
            $scope.email = '';
            $scope.mobile_phone = '';
            $scope.work_phone = '';
            $scope.street_address = '';
            $scope.city = '';
            $scope.state = '';
            $scope.zipcode = '';
        };


    });
