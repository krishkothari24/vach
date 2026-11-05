package org.vachdaily.widget

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject
import java.util.Calendar
import java.util.GregorianCalendar
import java.util.TimeZone

internal object DailyWidgetStore {
  private const val PREFERENCES = "daily_widget"
  private const val KEY_CATALOG = "catalog"
  private const val KEY_SOURCE = "source"

  fun save(context: Context, catalog: String, source: String) {
    context.getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE)
      .edit()
      .putString(KEY_CATALOG, catalog)
      .putString(KEY_SOURCE, source)
      .apply()
  }

  fun current(context: Context): JSONObject? {
    val preferences = context.getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE)
    val catalog = preferences.getString(KEY_CATALOG, null) ?: return null
    val source = preferences.getString(KEY_SOURCE, "both") ?: "both"
    val entries = try { JSONArray(catalog) } catch (_: Exception) { return null }
    val vachanamrut = mutableListOf<JSONObject>()
    val swaminiVato = mutableListOf<JSONObject>()
    for (index in 0 until entries.length()) {
      val entry = try { entries.getJSONObject(index) } catch (_: Exception) { continue }
      when (entry.optString("source")) {
        "vachanamrut" -> vachanamrut.add(entry)
        "swamini_vato" -> swaminiVato.add(entry)
      }
    }
    vachanamrut.sortBy { it.optString("id") }
    swaminiVato.sortBy { it.optString("id") }

    val local = GregorianCalendar()
    val utc = GregorianCalendar(TimeZone.getTimeZone("UTC"))
    utc.clear()
    utc.set(local.get(Calendar.YEAR), local.get(Calendar.MONTH), local.get(Calendar.DAY_OF_MONTH))
    val day = Math.floorDiv(utc.timeInMillis, 86_400_000L)
    val selected = when (source) {
      "vachanamrut" -> vachanamrut
      "swamini_vato" -> swaminiVato
      else -> when {
        vachanamrut.isEmpty() -> swaminiVato
        swaminiVato.isEmpty() -> vachanamrut
        Math.floorMod(day, 2L) == 0L -> vachanamrut
        else -> swaminiVato
      }
    }
    if (selected.isEmpty()) return null
    val mixed = source == "both" && vachanamrut.isNotEmpty() && swaminiVato.isNotEmpty()
    val cycleDay = if (mixed) Math.floorDiv(day, 2L) else day
    return selected[Math.floorMod(cycleDay, selected.size.toLong()).toInt()]
  }
}
