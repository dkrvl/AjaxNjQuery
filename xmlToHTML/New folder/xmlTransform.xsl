<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html"/> 

	<xsl:template match="/">
		<html>
			<head>
				<link rel="stylesheet" href="xmlTransform.css" type="text/css"/>
			</head>
			<body>
				
				<h1 align="center"> <xsl:value-of select="entry/title"/> </h1>
				<xsl:for-each select="/entry//signature">
					<div class="versionDetail">
						<p>Version: <xsl:apply-templates/></p>
					</div>
				</xsl:for-each> 
				<p class="desc"><strong>Description: </strong> <xsl:value-of select="/entry/desc"/></p>
				<div class="longdesc">
					<xsl:copy-of select="/entry/longdesc/p | /entry/longdesc/pre"/>
					<!-- <xsl:for-each select="/entry/longdesc//*">
						<xsl:if test="pre">
							<p><xsl:copy-of select="/entry/longdesc/pre"/></p>
						</xsl:if>	
					</xsl:for-each>  -->
				</div>
				<div>
					
					
					*********
				</div>
				==================

			</body>
		</html>
	</xsl:template>

<!-- <xsl:template match="/entry/title">
	<h1 align="center">aa <xsl:apply-templates/> </h1>
</xsl:template>
==================*
<xsl:template match="/entry/longdesc">
	<div class="test">$$<xsl:apply-templates/> $$$$$$$$$$$$$$$$$$$$$$</div>
</xsl:template>

-->
*************************
<xsl:template match="/entry/desc">
	<p><strong>Discription:</strong> <xsl:apply-templates/> </p>
</xsl:template>

<xsl:template match="/entry/desc">
	<p><strong>Discription:</strong> <xsl:apply-templates/> </p>
</xsl:template>

<xsl:template match="/PAGE/ARTICLE/TITLE">
	<h3> <xsl:apply-templates/> </h3>
</xsl:template>

<xsl:template match="/PAGE/ARTICLE/DESCRIPTION">
	<p> <xsl:apply-templates/> </p>
</xsl:template>

<xsl:template match="/PAGE/ASIDE/TITLE">
	<div style="float:left;width:30%;"><h3> <xsl:apply-templates/> </h3></div>
</xsl:template>

<xsl:template match="ITEM">
	<p> <xsl:apply-templates/> </p>
</xsl:template>

<xsl:template match="/PAGE/FOOTER">
	<div style="clear:both;"></div>
	<h1 align="center"> <xsl:apply-templates/> </h1>
</xsl:template>

</xsl:stylesheet>