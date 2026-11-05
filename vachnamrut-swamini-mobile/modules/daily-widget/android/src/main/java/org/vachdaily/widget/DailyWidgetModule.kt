package org.vachdaily.widget

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.json.JSONArray

class DailyWidgetModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("DailyWidget")

    Function("setCatalog") { json: String, sourcePreference: String ->
      require(sourcePreference in setOf("both", "vachanamrut", "swamini_vato")) {
        "Invalid source preference"
      }
      val entries = JSONArray(json)
      for (index in 0 until entries.length()) {
        val entry = entries.getJSONObject(index)
        require(entry.optString("id").isNotBlank()) { "Missing widget entry ID" }
        require(entry.optString("source") in setOf("vachanamrut", "swamini_vato")) { "Invalid widget source" }
        require(entry.optString("title").isNotBlank()) { "Missing widget title" }
        require(entry.optString("reference").isNotBlank()) { "Missing widget reference" }
        require(entry.optString("url").startsWith("vachdaily://reading/")) { "Invalid widget reading URL" }
      }
      val context = requireNotNull(appContext.reactContext) { "Android context is unavailable" }
      DailyWidgetStore.save(context, json, sourcePreference)
      DailyWidgetProvider.renderAll(context)
    }
  }
}
