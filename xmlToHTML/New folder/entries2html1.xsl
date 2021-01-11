<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:import href="entry2html-base.xsl"/>
	<xsl:import href="notes.xsl"/>
	<xsl:variable name="version-category-links" select="true()"/>
	<xsl:template name="example-code">
		<![CDATA[ <!doctype html>]]>
		<html lang="en">
			<head>
				<meta charset="utf-8">
					<title><xsl:value-of select="//entry/@name"/> demo</title>
					<xsl:if test="css">
						<style>
							<xsl:value-of select="css/text()"/>	</style>
						</xsl:if>
						<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
						<xsl:if test="code/@location='head'">
							<script>
								<xsl:copy-of select="code/text()"/>
							</script>
						</xsl:if>
					</head>
					<body>
						<xsl:copy-of select="html/text()"/>
						<xsl:choose>
							<xsl:when test="code/@location='head'"></xsl:when>
							<xsl:otherwise>
								<script>
									<xsl:copy-of select="code/text()"/>
								</script>
							</xsl:otherwise>
						</xsl:choose>
					</body>
				</html>
			</xsl:template>

		</xsl:stylesheet>