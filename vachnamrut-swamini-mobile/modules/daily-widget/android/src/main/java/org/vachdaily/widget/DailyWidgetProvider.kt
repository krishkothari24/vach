package org.vachdaily.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.view.View
import android.widget.RemoteViews

class DailyWidgetProvider : AppWidgetProvider() {
  override fun onUpdate(context: Context, manager: AppWidgetManager, widgetIds: IntArray) {
    widgetIds.forEach { render(context, manager, it) }
  }

  override fun onAppWidgetOptionsChanged(context: Context, manager: AppWidgetManager, widgetId: Int, options: android.os.Bundle) {
    render(context, manager, widgetId)
  }

  override fun onReceive(context: Context, intent: Intent) {
    super.onReceive(context, intent)
    if (intent.action in setOf(Intent.ACTION_DATE_CHANGED, Intent.ACTION_TIMEZONE_CHANGED, Intent.ACTION_TIME_CHANGED)) {
      renderAll(context)
    }
  }

  companion object {
    fun renderAll(context: Context) {
      val manager = AppWidgetManager.getInstance(context)
      val ids = manager.getAppWidgetIds(ComponentName(context, DailyWidgetProvider::class.java))
      ids.forEach { render(context, manager, it) }
    }

    private fun render(context: Context, manager: AppWidgetManager, widgetId: Int) {
      val entry = DailyWidgetStore.current(context)
      val views = RemoteViews(context.packageName, R.layout.daily_widget)
      val title = entry?.optString("title")?.takeIf { it.isNotBlank() } ?: "Daily teaching"
      val excerpt = entry?.optString("excerpt")?.takeIf { it.isNotBlank() } ?: ""
      val reference = entry?.optString("reference")?.takeIf { it.isNotBlank() } ?: "Open the app to prepare readings"
      val url = entry?.optString("url")?.takeIf { it.startsWith("vachdaily://reading/") }
      views.setTextViewText(R.id.daily_widget_title, title)
      views.setTextViewText(R.id.daily_widget_excerpt, excerpt)
      views.setViewVisibility(R.id.daily_widget_excerpt, if (excerpt.isEmpty()) View.GONE else View.VISIBLE)
      views.setTextViewText(R.id.daily_widget_reference, reference)

      val launch = context.packageManager.getLaunchIntentForPackage(context.packageName)
      if (launch != null) {
        launch.action = if (url == null) Intent.ACTION_MAIN else Intent.ACTION_VIEW
        launch.data = url?.let(Uri::parse)
        launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
        val pending = PendingIntent.getActivity(
          context,
          widgetId,
          launch,
          PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        views.setOnClickPendingIntent(R.id.daily_widget_root, pending)
      }
      manager.updateAppWidget(widgetId, views)
    }
  }
}
