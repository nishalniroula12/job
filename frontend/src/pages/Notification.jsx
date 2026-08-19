import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar.jsx";

import {
  Bell,
  BellRing,
  FileText,
  CheckCircle2,
  Clock,
  RefreshCw,
  Inbox,
} from "lucide-react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotification = async () => {
    try {
      setLoading(true);

      const res = await api.get("/getread");

      console.log("Notification response:", res.data);

      setNotifications(res.data.notification || []);
    } catch (error) {
      console.log("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  // Notification icon
  const getNotificationIcon = (type) => {
    if (type === "application") {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <FileText className="h-6 w-6" />
        </div>
      );
    }

    if (type === "status") {
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
      );
    }

    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600">
        <Bell className="h-6 w-6" />
      </div>
    );
  };

  // Notification title
  const getNotificationTitle = (type) => {
    if (type === "application") {
      return "New Application";
    }

    if (type === "status") {
      return "Application Status";
    }

    return "Notification";
  };

  // Badge style
  const getBadgeStyle = (type) => {
    if (type === "application") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    if (type === "status") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header Card */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* Left */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                  <BellRing className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Notifications
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Stay updated with your latest activity and applications.
                  </p>
                </div>

              </div>

              {/* Right */}
              <div className="flex items-center gap-3">

                {/* Notification Count */}
                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  {notifications.length}{" "}
                  {notifications.length === 1
                    ? "Notification"
                    : "Notifications"}
                </div>

                {/* Refresh */}
                <button
                  onClick={fetchNotification}
                  disabled={loading}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Refresh notifications"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      loading ? "animate-spin" : ""
                    }`}
                  />
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex flex-col items-center justify-center px-6 py-20">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <RefreshCw className="h-7 w-7 animate-spin text-blue-600" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-800">
                Loading notifications
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Please wait while we fetch your notifications.
              </p>

            </div>

          </div>
        )}

        {/* Empty State */}
        {!loading && notifications.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <Inbox className="h-10 w-10 text-gray-400" />
              </div>

              <h2 className="mt-6 text-xl font-semibold text-gray-800">
                No notifications yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                You're all caught up. New notifications about your
                applications and job activity will appear here.
              </p>

              <button
                onClick={fetchNotification}
                className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>

            </div>

          </div>
        )}

        {/* Notifications */}
        {!loading && notifications.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* List Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Notifications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest updates are shown below.
                </p>
              </div>

              <Bell className="h-5 w-5 text-gray-400" />

            </div>

            {/* Notification List */}
            <div>

              {notifications.map((item, index) => (

                <div
                  key={item._id}
                  className={`group p-5 transition-colors hover:bg-slate-50 ${
                    index !== notifications.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >

                  <div className="flex gap-4">

                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {getNotificationIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <h3 className="text-base font-semibold text-gray-900">
                            {getNotificationTitle(item.type)}
                          </h3>

                          <p className="mt-1.5 text-sm leading-6 text-gray-600">
                            {item.message}
                          </p>

                        </div>

                        {/* Type Badge */}
                        <span
                          className={`w-fit rounded-full border px-3 py-1 text-xs font-medium capitalize ${getBadgeStyle(
                            item.type
                          )}`}
                        >
                          {item.type}
                        </span>

                      </div>

                      {/* Date */}
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">

                        <Clock className="h-3.5 w-3.5" />

                        <span>
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleString()
                            : "Date unavailable"}
                        </span>

                      </div>

                    </div>

                    {/* Small unread dot */}
                    <div className="hidden pt-2 sm:block">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600 opacity-0 transition group-hover:opacity-100" />
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default Notification;